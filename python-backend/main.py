"""
FastAPI WebSocket server for real-time audio transcription using Faster-Whisper
Optimized for healthcare applications with secure WebSocket communication
"""

import os
import asyncio
import json
import numpy as np
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from faster_whisper import WhisperModel
import wave
import io
from typing import Optional
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Medical Transcription Service")

# CORS configuration for healthcare app security
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Add your frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global Whisper model (loaded once for efficiency)
whisper_model: Optional[WhisperModel] = None

# Audio buffer configuration for real-time processing
SAMPLE_RATE = 16000  # Whisper expects 16kHz
CHUNK_DURATION = 2  # Process audio in 2-second chunks
CHUNK_SIZE = SAMPLE_RATE * CHUNK_DURATION


def initialize_whisper_model():
    """Initialize the Faster-Whisper model"""
    global whisper_model
    try:
        logger.info("Loading Faster-Whisper small model...")
        # Use 'small' model for better accuracy (supports Hindi and English)
        # Options: "tiny" (fast but less accurate), "base", "small", "medium", "large"
        # device options: "cpu", "cuda" (for GPU)
        # compute_type options: "int8", "float16", "float32"
        whisper_model = WhisperModel(
            "small",  # Changed from "tiny" to "small" for better accuracy
            device="cpu",
            compute_type="int8",  # Use int8 for faster CPU inference
            download_root=None,  # Uses default cache directory
        )
        logger.info("Faster-Whisper small model loaded successfully!")
    except Exception as e:
        logger.error(f"Failed to load Whisper model: {e}")
        raise


@app.on_event("startup")
async def startup_event():
    """Initialize model on server startup"""
    initialize_whisper_model()


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "model_loaded": whisper_model is not None,
        "timestamp": datetime.now().isoformat()
    }


def audio_bytes_to_numpy(audio_data: bytes, sample_rate: int = 16000) -> np.ndarray:
    """
    Convert raw audio bytes (PCM) to numpy array normalized for Whisper
    
    Args:
        audio_data: Raw PCM audio bytes (16-bit signed integer)
        sample_rate: Sample rate of the audio
    
    Returns:
        Normalized numpy array (float32, range -1.0 to 1.0)
    """
    # Convert bytes to int16 numpy array
    audio_int16 = np.frombuffer(audio_data, dtype=np.int16)
    
    # Convert to float32 and normalize to [-1.0, 1.0]
    audio_float32 = audio_int16.astype(np.float32) / 32768.0
    
    return audio_float32


def transcribe_audio(audio_array: np.ndarray, language: str = None) -> str:
    """
    Transcribe audio using Faster-Whisper
    
    Args:
        audio_array: Normalized audio as numpy array
        language: Language code (e.g., "en", "hi", "mr") or None for auto-detection
    
    Returns:
        Transcribed text
    """
    if whisper_model is None:
        raise RuntimeError("Whisper model not initialized")
    
    try:
        # Transcribe with optimized settings for medical context
        # language=None enables auto-detection for Hindi, English, Marathi, etc.
        segments, info = whisper_model.transcribe(
            audio_array,
            language=language,  # None for auto-detection, "en" for English, "hi" for Hindi
            beam_size=5,
            best_of=5,
            temperature=0.0,  # Deterministic output
            vad_filter=True,  # Voice Activity Detection to filter silence
            vad_parameters=dict(
                threshold=0.5,
                min_speech_duration_ms=250,
                min_silence_duration_ms=100,
            ),
        )
        
        # Combine all segments into full text
        transcription = " ".join([segment.text.strip() for segment in segments])
        
        # Log detected language
        if language is None:
            logger.info(f"Detected language: {info.language} (probability: {info.language_probability:.2f})")
        
        return transcription
    
    except Exception as e:
        logger.error(f"Transcription error: {e}")
        return ""


class AudioBuffer:
    """Buffer to accumulate audio chunks for processing"""
    
    def __init__(self, sample_rate: int = 16000):
        self.sample_rate = sample_rate
        self.buffer = np.array([], dtype=np.float32)
        self.min_chunk_size = sample_rate * 1  # Minimum 1 second for transcription
        
    def add_audio(self, audio_data: np.ndarray):
        """Add audio data to buffer"""
        self.buffer = np.concatenate([self.buffer, audio_data])
        
    def get_and_clear(self) -> Optional[np.ndarray]:
        """Get buffered audio if sufficient, and clear buffer"""
        if len(self.buffer) >= self.min_chunk_size:
            audio = self.buffer.copy()
            self.buffer = np.array([], dtype=np.float32)
            return audio
        return None
    
    def has_sufficient_audio(self) -> bool:
        """Check if buffer has enough audio for transcription"""
        return len(self.buffer) >= self.min_chunk_size


@app.websocket("/ws/transcribe")
async def websocket_transcribe(websocket: WebSocket):
    """
    WebSocket endpoint for real-time audio transcription
    
    Expected client message format:
    {
        "type": "audio",
        "data": <base64 encoded PCM audio bytes>,
        "sampleRate": 16000,
        "language": "en" | "hi" | "mr" | null  // optional, null for auto-detection
    }
    
    Server response format:
    {
        "type": "transcription",
        "text": "transcribed text",
        "timestamp": "ISO timestamp",
        "isFinal": true/false,
        "language": "detected_language"  // if auto-detection is used
    }
    """
    await websocket.accept()
    logger.info(f"Client connected: {websocket.client}")
    
    audio_buffer = AudioBuffer(sample_rate=SAMPLE_RATE)
    session_language = None  # Default to auto-detection
    
    try:
        await websocket.send_json({
            "type": "connection",
            "status": "connected",
            "message": "Real-time transcription ready (supports Hindi, English, Marathi, etc.)",
            "model": "faster-whisper-small",
            "supportedLanguages": ["en", "hi", "mr", "auto"]
        })
        
        while True:
            # Receive audio data from client
            message = await websocket.receive()
            
            if "text" in message:
                data = json.loads(message["text"])
                
                if data.get("type") == "audio":
                    # Update session language if provided
                    if "language" in data:
                        session_language = data["language"]
                        logger.info(f"Language set to: {session_language or 'auto-detect'}")
                    
                    # Decode base64 audio data
                    import base64
                    audio_bytes = base64.b64decode(data["data"])
                    
                    # Convert to numpy array
                    audio_array = audio_bytes_to_numpy(audio_bytes, SAMPLE_RATE)
                    
                    # Add to buffer
                    audio_buffer.add_audio(audio_array)
                    
                    # Process if we have enough audio
                    if audio_buffer.has_sufficient_audio():
                        buffered_audio = audio_buffer.get_and_clear()
                        
                        if buffered_audio is not None:
                            # Transcribe in background to not block WebSocket
                            transcription = await asyncio.to_thread(
                                transcribe_audio, 
                                buffered_audio,
                                session_language
                            )
                            
                            if transcription.strip():
                                # Send transcription back to client
                                await websocket.send_json({
                                    "type": "transcription",
                                    "text": transcription,
                                    "timestamp": datetime.now().isoformat(),
                                    "isFinal": True
                                })
                                
                                logger.info(f"Transcribed: {transcription[:100]}...")
                
                elif data.get("type") == "stop":
                    # Process any remaining audio in buffer
                    if len(audio_buffer.buffer) > 0:
                        final_audio = audio_buffer.buffer.copy()
                        audio_buffer.buffer = np.array([], dtype=np.float32)
                        
                        transcription = await asyncio.to_thread(
                            transcribe_audio, 
                            final_audio,
                            session_language
                        )
                        
                        if transcription.strip():
                            await websocket.send_json({
                                "type": "transcription",
                                "text": transcription,
                                "timestamp": datetime.now().isoformat(),
                                "isFinal": True
                            })
                    
                    await websocket.send_json({
                        "type": "session_end",
                        "message": "Transcription session ended"
                    })
            
            elif "bytes" in message:
                # Handle binary audio data directly
                audio_bytes = message["bytes"]
                audio_array = audio_bytes_to_numpy(audio_bytes, SAMPLE_RATE)
                audio_buffer.add_audio(audio_array)
                
                if audio_buffer.has_sufficient_audio():
                    buffered_audio = audio_buffer.get_and_clear()
                    
                    if buffered_audio is not None:
                        transcription = await asyncio.to_thread(
                            transcribe_audio, 
                            buffered_audio,
                            session_language
                        )
                        
                        if transcription.strip():
                            await websocket.send_json({
                                "type": "transcription",
                                "text": transcription,
                                "timestamp": datetime.now().isoformat(),
                                "isFinal": True
                            })
    
    except WebSocketDisconnect:
        logger.info(f"Client disconnected: {websocket.client}")
    
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        try:
            await websocket.send_json({
                "type": "error",
                "message": str(e)
            })
        except:
            pass
    
    finally:
        logger.info("WebSocket connection closed")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,  # Set to False in production
        log_level="info"
    )
