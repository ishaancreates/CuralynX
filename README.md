# 🏥 CuralynX - AI Medical Scribe for Indian Healthcare

<div align="center">

![CuralynX](https://img.shields.io/badge/CuralynX-Medical%20AI-brightgreen?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

**Transforming Doctor-Patient Conversations into Clinical Documentation**

*Giving doctors their time back, one conversation at a time.*

[🚀 Live Demo](#) • [📖 Documentation](#getting-started) • [💬 Support](#)

</div>

---

## 🎯 The Problem We Solve

Every year, **thousands of hours** are lost to typing, clicking, and documenting patient visits. Doctors spend more time on screens than with patients. In India, where healthcare access is already strained, this inefficiency is even more critical.

### 🇮🇳 Why India Needs CuralynX

- **Language Barrier**: India has 22 official languages. Many patients struggle with English-only systems.
- **Doctor Shortage**: With only ~1 doctor per 1,445 people, doctors can't afford to waste time on paperwork.
- **Documentation Burden**: Doctors spend 40-50% of their time on documentation instead of patient care.
- **Multilingual Patients**: Patients speak Hindi, Marathi, Tamil, and more - but medical records are in English.

**CuralynX bridges this gap** with real-time transcription in **Hindi, English, and other Indian languages**, automatically generating clinical notes from natural conversations.

---

## ✨ What Makes CuralynX Different

### 🎤 **Real-Time Multilingual Transcription**
- Support for **English**, **Hindi**, **Marathi**, and more Indian languages
- Automatic language detection
- Powered by Faster-Whisper for accurate medical terminology

### 🧠 **AI-Powered Clinical Intelligence**
- Automatically detects speaker (doctor vs. patient)
- Extracts symptoms, diagnosis, and treatment plans
- Generates SOAP notes (Subjective, Objective, Assessment, Plan)
- Smart medication and test suggestions

### 📋 **Instant Documentation**
- Generate prescriptions in seconds
- Professional, printable format
- Digital record keeping
- Medical history integration

### 🔒 **Healthcare-Grade Security**
- HIPAA-compliant architecture ready
- Secure WebSocket communication
- Encrypted data transmission
- Patient privacy at the core

---

## 🚀 How It Works

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Doctor    │  speaks │              │   AI    │  Clinical   │
│     &       │ ───────>│  CuralynX    │ ──────> │    Note     │
│   Patient   │         │  (Listens)   │         │  Generated  │
└─────────────┘         └──────────────┘         └─────────────┘
                              │
                              │ Real-time Transcription
                              │ • Hindi/English Detection
                              │ • Speaker Identification
                              │ • Medical Term Recognition
                              ▼
                        ┌──────────────┐
                        │ Prescription │
                        │  + Reports   │
                        └──────────────┘
```

### Step-by-Step:

1. **🎙️ Doctor starts the session** - Click "Start Recording"
2. **💬 Natural conversation happens** - Doctor and patient talk normally in Hindi, English, or mixed
3. **🤖 AI listens and understands** - CuralynX transcribes in real-time, detecting speakers
4. **📝 Notes are auto-generated** - SOAP notes, symptoms, and diagnosis extracted
5. **💊 Smart suggestions appear** - Medications and tests recommended based on symptoms
6. **📄 Prescription ready** - Professional prescription generated with one click
7. **✅ Doctor reviews and approves** - Quick edits if needed, then print/save

---

## 🛠️ Technology Stack

### Frontend (Client)
```
⚛️  React 18 + TypeScript
🎨  Tailwind CSS + Framer Motion
🎯  Vite (Build Tool)
🎤  Web Speech API / AssemblyAI
🔌  WebSocket for Real-time
```

### Backend (Python)
```
🚀  FastAPI (High Performance)
🎙️  Faster-Whisper (Speech-to-Text)
🧠  Google Gemini (AI Intelligence)
🔌  WebSocket Communication
📦  NumPy for Audio Processing
```

### AI Models
```
🗣️  Faster-Whisper Small (Transcription)
🤖  Google Gemini Flash (Clinical Analysis)
🎯  Custom Speaker Detection Algorithm
🇮🇳  Multi-language Support (Hindi, English, Marathi)
```

---

## 📦 Project Structure

```
hack-w-up-hackathon/
├── 📁 client/                    # React Frontend Application
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── todays-session/  # Doctor dashboard & session
│   │   │   │   ├── Sidebar.tsx          # Patient queue
│   │   │   │   ├── MainArea.tsx         # Prescription workspace
│   │   │   │   ├── MedicationsSection.tsx
│   │   │   │   ├── TestsSection.tsx
│   │   │   │   └── PrescriptionModal.tsx
│   │   │   └── dashboard/       # Admin dashboard
│   │   ├── features/
│   │   │   ├── patient/         # Patient portal
│   │   │   └── transcription/   # Real-time transcription
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── useWebSpeechRecognition.ts
│   │   │   ├── useAssemblyAIRealtime.ts
│   │   │   └── useProactiveReportAgent.ts
│   │   ├── services/
│   │   │   ├── geminiService.ts         # AI integration
│   │   │   └── proactiveReportAgent.ts  # SOAP generation
│   │   ├── contexts/
│   │   │   └── SessionContext.tsx       # Global state
│   │   └── pages/
│   │       ├── Dashboard.tsx
│   │       ├── SessionPage.tsx
│   │       └── PatientTimeline.tsx
│   └── package.json
│
├── 📁 python-backend/            # FastAPI Transcription Server
│   ├── main.py                   # WebSocket server
│   ├── requirements.txt
│   ├── README.md
│   └── client_example.html       # Test client
│
├── 📁 server/                    # Node.js API Server
│   ├── index.js
│   └── package.json
│
├── 📁 model/                     # ML Models & Training
│   ├── finetune_whisper.py
│   └── train.py
│
└── README.md                     # You are here! 👋
```

---

## 🚦 Getting Started

### Prerequisites
- **Node.js** v16+ (for frontend & server)
- **Python** 3.8+ (for transcription backend)
- **npm** or **yarn**
- **Git**

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ishaancreates/hack-w-up-hackathon.git
cd hack-w-up-hackathon
```

### 2️⃣ Setup Frontend (Client)
```bash
cd client
npm install
npm run dev
```
Frontend runs at: **http://localhost:5173**

### 3️⃣ Setup Node.js Server
```bash
cd server
npm install
npm start
```
Server runs at: **http://localhost:5000**

### 4️⃣ Setup Python Transcription Server
```bash
cd python-backend

# Create virtual environment
python -m venv venv

# Activate (Windows PowerShell)
.\venv\Scripts\Activate.ps1

# Activate (Linux/Mac)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run server
python main.py
```
Transcription server runs at: **http://localhost:8000**

### 5️⃣ Configure Environment Variables

**Server (.env)**
```env
ASSEMBLYAI_API_KEY=your_api_key_here
PORT=5000
```

**Client (.env)**
```env
VITE_API_URL=http://localhost:5000
VITE_WS_URL=ws://localhost:8000
VITE_GEMINI_API_KEY=your_gemini_api_key
```

---

## 🎮 Usage Guide

### For Doctors:

1. **📋 Dashboard** - View today's patient queue
2. **▶️ Start Session** - Click on a patient to begin
3. **🎤 Record Consultation** - Have natural conversation (Hindi/English)
4. **📝 Review Transcript** - AI auto-transcribes with speaker labels
5. **💊 Add Medications/Tests** - Smart suggestions or manual entry
6. **📄 Generate Prescription** - One-click professional prescription
7. **✅ Print/Save** - Download or print for patient

### For Patients:

1. **📱 Patient Portal** - View appointments & medical history
2. **📊 Medical Snapshot** - See active medications & vitals
3. **📆 Book Appointments** - Schedule with available doctors
4. **💬 Secure Messaging** - Chat with healthcare team
5. **📋 Reports** - Access lab results & prescriptions

---

## 🌟 Key Features

### 🎙️ **Real-Time Transcription**
- Live audio-to-text conversion
- Multi-language support (Hindi, English, Marathi)
- Automatic language detection
- Medical terminology accuracy

### 🧑‍⚕️ **Smart Speaker Detection**
- AI identifies doctor vs patient automatically
- Pattern-based algorithm
- Medical terminology recognition
- Question structure analysis

### 📋 **SOAP Note Generation**
- **S**ubjective: Patient's complaints
- **O**bjective: Clinical findings
- **A**ssessment: Diagnosis
- **P**lan: Treatment & prescriptions

### 💊 **Intelligent Prescription**
- Pre-configured medication database
- Dosage recommendations
- Drug interaction warnings
- Professional printable format

### 📊 **Medical History Integration**
- Past diseases tracking
- Vital signs monitoring
- Previous prescriptions
- Lab results archive

### 🔐 **Security & Privacy**
- HIPAA-compliant ready
- Encrypted WebSocket (WSS)
- Secure data storage
- Access control

---

## 🌍 Indic Language Support

CuralynX is built for **Bharat**, supporting multiple Indian languages:

### Supported Languages:
- 🇮🇳 **Hindi** (हिंदी) - Native support
- 🇬🇧 **English** - Full support
- 🇮🇳 **Marathi** (मराठी) - Coming soon
- 🇮🇳 **Tamil** (தமிழ்) - Coming soon
- 🇮🇳 **Bengali** (বাংলা) - Coming soon

### How It Works:
```javascript
// Auto-detect language
ws.send({
  type: 'audio',
  data: audioData,
  language: null  // Auto-detect
});

// Or specify language
ws.send({
  type: 'audio',
  data: audioData,
  language: 'hi'  // Hindi
});
```

### Language Detection:
- Automatic language identification
- Mixed language conversation support
- Real-time language switching
- Probability-based detection

---

## 🏥 Use Cases

### 1. **Primary Care Clinics**
- Quick consultations (5-10 min)
- Common ailments (fever, cold, etc.)
- Prescription generation
- Follow-up tracking

### 2. **Multi-Specialty Hospitals**
- Department-wise workflow
- Complex case documentation
- Multi-doctor collaboration
- Comprehensive patient history

### 3. **Rural Healthcare Centers**
- Language barrier solution
- Minimal tech literacy required
- Offline capabilities (planned)
- Voice-first interface

### 4. **Telemedicine**
- Remote consultation transcription
- Video call integration
- Digital prescription delivery
- Patient portal access

---

## 📊 API Documentation

### Python Backend (Transcription)

#### WebSocket Endpoint: `/ws/transcribe`

**Connect:**
```javascript
const ws = new WebSocket('ws://localhost:8000/ws/transcribe');
```

**Send Audio:**
```javascript
ws.send(JSON.stringify({
  type: 'audio',
  data: base64AudioData,
  sampleRate: 16000,
  language: 'hi'  // 'en', 'hi', 'mr', or null for auto-detect
}));
```

**Receive Transcription:**
```javascript
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'transcription') {
    console.log(data.text);
    console.log(data.language);  // Detected language
  }
};
```

### Health Check
```bash
GET http://localhost:8000/health
```

Response:
```json
{
  "status": "healthy",
  "model_loaded": true,
  "timestamp": "2025-11-02T10:30:45.123456"
}
```

---

## 🔧 Configuration

### Whisper Model Options

Edit `python-backend/main.py`:

```python
# Faster model (less accurate)
whisper_model = WhisperModel("tiny", device="cpu")

# Current (balanced)
whisper_model = WhisperModel("small", device="cpu")

# More accurate (slower)
whisper_model = WhisperModel("medium", device="cpu")

# Best accuracy (slowest)
whisper_model = WhisperModel("large-v3", device="cpu")

# GPU acceleration
whisper_model = WhisperModel("small", device="cuda")
```

### Audio Buffer Settings
```python
SAMPLE_RATE = 16000      # Audio sample rate
CHUNK_DURATION = 2       # Process every 2 seconds
```

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines:
- Follow existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 🐛 Known Issues & Limitations

- [ ] WebSocket connection occasionally drops (reconnection logic needed)
- [ ] Language detection accuracy varies with accent
- [ ] Prescription print layout needs CSS refinement
- [ ] Mobile responsive design in progress
- [ ] Offline mode not yet implemented

---

## 🗺️ Roadmap

### Q1 2026
- [ ] **Voice Commands** - "Generate prescription", "Add medication"
- [ ] **More Languages** - Tamil, Telugu, Bengali support
- [ ] **Mobile Apps** - iOS and Android native apps
- [ ] **OCR Integration** - Scan previous prescriptions

### Q2 2026
- [ ] **Offline Mode** - Work without internet
- [ ] **EHR Integration** - Connect with hospital systems
- [ ] **Drug Database** - Complete Indian drug index
- [ ] **Analytics Dashboard** - Practice insights

### Q3 2026
- [ ] **AI Diagnosis Assistant** - Suggest differential diagnosis
- [ ] **Patient App** - Mobile app for patients
- [ ] **Insurance Integration** - Auto-generate claim forms
- [ ] **Multi-clinic Support** - Manage multiple locations

---

## 📸 Screenshots

### Doctor Dashboard
*Real-time transcription with patient queue*

### Prescription Generator
*One-click professional prescriptions*

### Patient Portal
*Comprehensive medical history view*

---

## 🏆 Awards & Recognition

Built for **Hack-W-Up Hackathon** 🚀

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Developer**: [Ishaan Creates](https://github.com/ishaancreates)
- **Contributors**: Open Source Community

---

## 📞 Support & Contact

- 📧 **Email**: support@curalynx.ai
- 🐛 **Issues**: [GitHub Issues](https://github.com/ishaancreates/hack-w-up-hackathon/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/ishaancreates/hack-w-up-hackathon/discussions)

---

## 🙏 Acknowledgments

- **Faster-Whisper** - For incredible speech recognition
- **Google Gemini** - For AI-powered analysis
- **AssemblyAI** - For real-time transcription support
- **React & Vite** - For amazing developer experience
- **FastAPI** - For blazing fast Python backend

---

<div align="center">

**Made with ❤️ for Indian Healthcare**

*Empowering doctors, one conversation at a time*

⭐ **Star this repo** if you find it helpful!

</div>