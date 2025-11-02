# Real-Time Medical Transcription Server

FastAPI WebSocket server for real-time audio transcription using Faster-Whisper tiny model, optimized for healthcare applications.

## Features

- ⚡ Real-time transcription using Faster-Whisper (optimized for speed)
- 🔒 Secure WebSocket communication (WSS support ready)
- 🏥 Healthcare-optimized with HIPAA-compliant architecture ready
- 🎤 Direct microphone audio streaming from frontend
- 📦 Lightweight tiny model for fast inference
- 🔊 Voice Activity Detection (VAD) to filter silence
- 🔄 Efficient audio buffering for continuous transcription

## Requirements

- Python 3.8+
- 4GB RAM minimum (8GB recommended)
- CPU (GPU optional for faster processing)

## Installation

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
```bash
# Windows PowerShell
.\venv\Scripts\Activate.ps1

# Windows CMD
.\venv\Scripts\activate.bat

# Linux/Mac
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Server

### Development Mode
```bash
python main.py
```

Or with uvicorn:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Production Mode
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

The server will start at `http://localhost:8000`

## API Endpoints

### Health Check
```
GET /health
```
Returns server status and model information.

### WebSocket Transcription
```
WS /ws/transcribe
```
WebSocket endpoint for real-time audio transcription.

## WebSocket Protocol

### Client → Server Messages

**Audio Data (JSON format):**
```json
{
  "type": "audio",
  "data": "<base64 encoded PCM audio>",
  "sampleRate": 16000
}
```

**Stop Recording:**
```json
{
  "type": "stop"
}
```

**Audio Data (Binary format):**
Send raw PCM audio bytes directly as binary WebSocket message.

### Server → Client Messages

**Connection Confirmation:**
```json
{
  "type": "connection",
  "status": "connected",
  "message": "Real-time transcription ready",
  "model": "faster-whisper-tiny"
}
```

**Transcription Result:**
```json
{
  "type": "transcription",
  "text": "transcribed text from audio",
  "timestamp": "2025-11-02T10:30:45.123456",
  "isFinal": true
}
```

**Error:**
```json
{
  "type": "error",
  "message": "error description"
}
```

## Audio Format Requirements

- **Sample Rate:** 16000 Hz (16 kHz)
- **Bit Depth:** 16-bit signed integer (PCM)
- **Channels:** 1 (mono)
- **Encoding:** PCM (uncompressed)

## Frontend Integration

The frontend needs to:
1. Capture audio from microphone using Web Audio API
2. Resample to 16kHz mono
3. Convert to PCM format
4. Send chunks via WebSocket (base64 encoded or binary)

See the example client implementation below.

## Model Options

You can change the model size by modifying `main.py`:

```python
whisper_model = WhisperModel(
    "tiny",      # Options: "tiny", "base", "small", "medium", "large-v2", "large-v3"
    device="cpu",  # Options: "cpu", "cuda"
    compute_type="int8"  # Options: "int8", "float16", "float32"
)
```

**Model Comparison:**
- `tiny`: Fastest, ~75MB, good for real-time
- `base`: Better accuracy, ~145MB
- `small`: Good balance, ~466MB
- `medium`: High accuracy, ~1.5GB
- `large`: Best accuracy, ~3GB

## Performance Optimization

### For CPU:
- Use `tiny` or `base` model
- Set `compute_type="int8"`
- Adjust `CHUNK_DURATION` for your needs (1-3 seconds)

### For GPU (CUDA):
```python
whisper_model = WhisperModel("tiny", device="cuda", compute_type="float16")
```

## Security Considerations (Healthcare/HIPAA)

For production healthcare applications:

1. **Use WSS (WebSocket Secure):** Deploy behind HTTPS/WSS
2. **Authentication:** Add token-based authentication
3. **Encryption:** All data must be encrypted in transit (TLS)
4. **Audit Logging:** Log all transcription sessions
5. **Data Retention:** Implement proper data retention policies
6. **Access Control:** Implement role-based access control (RBAC)

## Troubleshooting

### Model Download Issues
The model will auto-download on first run. If issues occur:
```bash
# Pre-download the model
python -c "from faster_whisper import WhisperModel; WhisperModel('tiny')"
```

### Memory Issues
Reduce `CHUNK_DURATION` or use a smaller model.

### Connection Issues
Check CORS settings in `main.py` - ensure your frontend URL is allowed.

## License

This server is part of the healthcare transcription system.
