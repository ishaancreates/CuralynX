import { useState, useEffect, useRef } from 'react';

const initialPatients = [
    { id: 1, name: 'Priya Sharma', time: '10:00 AM', status: 'active', age: 38, pastDiseases: 'Allergic Rhinitis', weight: '68 kg', bp: '118/75', sugarLevel: '92 mg/dL' },
    { id: 2, name: 'Rajesh Kumar', time: '10:30 AM', status: 'waiting', age: 55, pastDiseases: 'Type 2 Diabetes', weight: '95 kg', bp: '135/88', sugarLevel: '140 mg/dL' },
    { id: 3, name: 'Anita Patel', time: '11:00 AM', status: 'waiting', age: 29, pastDiseases: 'None', weight: '58 kg', bp: '110/70', sugarLevel: '85 mg/dL' },
    { id: 4, name: 'Suresh Gupta', time: '11:30 AM', status: 'waiting', age: 67, pastDiseases: 'Coronary Artery Disease', weight: '82 kg', bp: '145/92', sugarLevel: '105 mg/dL' },
    { id: 5, name: 'Meera Singh', time: '12:00 PM', status: 'waiting', age: 42, pastDiseases: 'Migraines', weight: '75 kg', bp: '125/80', sugarLevel: '98 mg/dL' },
];

// Minimal types for prefixed SpeechRecognition
type AnyRecognition = any;

const Sidebar = () => {
    const [patients] = useState(initialPatients);
    const [isHovered, setIsHovered] = useState(false);
    const activePatient = patients.find(p => p.status === 'active');
    const [transcript, setTranscript] = useState<{ speaker: string; text: string }[]>([]);
    const [interim, setInterim] = useState<string>('');
    const [isListening, setIsListening] = useState<boolean>(false);
    const [hasMicSupport, setHasMicSupport] = useState<boolean>(true);
    const [micError, setMicError] = useState<string | null>(null);
    const recognitionRef = useRef<AnyRecognition | null>(null);
    const backoffRef = useRef<number>(1000);
    const restartTimerRef = useRef<number | null>(null);
    const shouldRestartRef = useRef<boolean>(false);

    // Reset transcript when active patient changes
    useEffect(() => {
        setTranscript([]);
        setInterim('');
    }, [activePatient]);

    // Initialize SpeechRecognition once
    useEffect(() => {
        const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SR) {
            setHasMicSupport(false);
            return;
        }
        setHasMicSupport(true);

        const rec = new SR();
        rec.continuous = true;
        rec.interimResults = true;
        // Default to Hindi to match demo copy; switch to 'en-US' if needed
        rec.lang = 'hi-IN';

        rec.onresult = (event: any) => {
            let finalText = '';
            let interimText = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const res = event.results[i];
                if (res.isFinal) {
                    finalText += res[0].transcript;
                } else {
                    interimText += res[0].transcript;
                }
            }
            if (finalText.trim()) {
                setTranscript(prev => [...prev, { speaker: 'Patient', text: finalText.trim() }]);
            }
            setInterim(interimText);
            setMicError(null);  
            backoffRef.current = 1000;
        };

        rec.onerror = (e: any) => {
            const err = e?.error || 'unknown';
            // eslint-disable-next-line no-console
            console.warn('SpeechRecognition error:', err);
            let message: string | null = null;
            if (err === 'network') {
                message = 'Speech service network error. Check your internet connection. Retrying…';
            } else if (err === 'not-allowed' || err === 'service-not-allowed') {
                message = 'Microphone permission denied. Please allow mic access and try again.';
            } else if (err === 'no-speech') {
                message = 'No speech detected. Listening…';
            } else if (err === 'audio-capture') {
                message = 'No microphone found. Please connect a mic and try again.';
            }
            if (message) setMicError(message);

            if ((err === 'network' || err === 'no-speech' || err === 'audio-capture') && isListening) {
                // Backoff and controlled restart to avoid rapid loops
                try { rec.stop(); } catch {}
                shouldRestartRef.current = true;
                if (restartTimerRef.current) {
                    window.clearTimeout(restartTimerRef.current);
                }
                const delay = backoffRef.current;
                restartTimerRef.current = window.setTimeout(() => {
                    if (!recognitionRef.current) return;
                    shouldRestartRef.current = false;
                    try {
                        recognitionRef.current.start();
                    } catch {}
                }, delay);
                backoffRef.current = Math.min(backoffRef.current * 2, 8000);
            }
        };

        rec.onend = () => {
            // Auto-restart if we are supposed to be listening and no controlled backoff is in progress
            if (isListening && !shouldRestartRef.current) {
                try {
                    rec.start();
                } catch (err) {
                    // eslint-disable-next-line no-console
                    console.debug('Recognition restart suppressed:', err);
                }
            }
        };

        recognitionRef.current = rec;

        return () => {
            try {
                rec.onresult = null;
                rec.onerror = null;
                rec.onend = null;
                rec.stop();
            } catch {}
            recognitionRef.current = null;
        };
        // We intentionally don't include isListening here to avoid re-instantiation
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Start/Stop based on isListening
    useEffect(() => {
        const rec = recognitionRef.current;
        if (!rec) return;
        if (isListening) {
            try {
                rec.start();
            } catch (err) {
                // Chrome throws if start is called twice; ignore
                // eslint-disable-next-line no-console
                console.debug('Recognition already started.');
            }
        } else {
            try {
                if (restartTimerRef.current) {
                    window.clearTimeout(restartTimerRef.current);
                    restartTimerRef.current = null;
                }
                backoffRef.current = 1000;
                setMicError(null);
                rec.stop();
                setInterim('');
            } catch {}
        }
    }, [isListening]);

    // Auto scroll to bottom when new message is added
    useEffect(() => {
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer) {
            chatContainer.scrollTo({
                top: chatContainer.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [transcript, interim]);

    const patientsToShow = isHovered ? patients : (activePatient ? [activePatient] : []);

    return (
        <div className="h-full bg-gray-100 p-4">
            <div className="flex flex-col space-y-4">
                {/* Today's Patients Card */}
                <div
                    className="bg-white/70 backdrop-blur-sm px-4 py-4 rounded-lg shadow-md"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <h3 className="text-md font-semibold text-gray-700 mb-4">Today's Appointments</h3>
                    <div className={`space-y-3 overflow-y-auto transition-all duration-500 ${isHovered ? 'h-64' : 'h-15'}`}>
                        {patientsToShow.map((patient) => (
                            <div
                                key={patient.id}
                                className={`p-3 rounded cursor-pointer transition-all mx-1 ${patient.status === 'active'
                                    ? 'bg-white text-gray-800 shadow-md'
                                    : 'bg-white hover:bg-gray-50 opacity-60 hover:opacity-100'
                                    }`}
                            >
                                <div className="flex justify-between items-center ">
                                    <p className="font-semibold text-sm">{patient.name}</p>
                                    <p className="text-sm">{patient.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Active Patient Details Card */}
                <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md">
                    <h3 className="text-md font-semibold text-gray-700 mb-4">Active Patient Vitals</h3>
                    {activePatient ? (
                        <div className="space-y-3 text-sm">
                            <div>
                                <span className="font-semibold text-gray-600">Patient: </span>
                                {activePatient.name}
                            </div>
                            <div className="flex justify-between">
                                <div><span className="font-semibold text-gray-600">Age:</span> {activePatient.age}</div>
                                <div><span className="font-semibold text-gray-600">Weight:</span> {activePatient.weight}</div>
                            </div>
                            <div className="flex justify-between">
                                <div><span className="font-semibold text-gray-600">Blood Pressure:</span> {activePatient.bp}</div>
                                <div><span className="font-semibold text-gray-600">Glucose:</span> {activePatient.sugarLevel}</div>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-600">Medical History: </span>
                                {activePatient.pastDiseases}
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500">No active patient selected.</p>
                    )}
                </div>

                {/* Live Transcription Card */}
                <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md">
                    <h3 className="font-semibold text-md mb-3 flex items-center">
                        <span className={`w-2 h-2 rounded-full mr-2 ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`}></span>
                        Live Transcription
                        {hasMicSupport ? (
                            <button
                                onClick={() => setIsListening(v => !v)}
                                className={`ml-auto flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors ${isListening ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                aria-pressed={isListening}
                                aria-label={isListening ? 'Stop microphone' : 'Start microphone'}
                            >
                                {isListening ? 'Stop Mic' : 'Start Mic'}
                            </button>
                        ) : (
                            <span className="ml-auto text-xs text-gray-500">Mic not supported in this browser</span>
                        )}
                    </h3>
                    {micError && (
                        <div className="mb-2 text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1" aria-live="polite">
                            {micError}
                        </div>
                    )}
                    <div
                        id="chat-container"
                        className="space-y-3 h-48 overflow-y-auto text-sm pr-2 scroll-smooth scrollbar-hide"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {transcript.map((line, index) => {
                            const isLatestMessage = index === transcript.length - 1;
                            return (
                                <div
                                    key={`final-${index}`}
                                    className={`flex transition-all duration-300 ease-in-out ${line.speaker === 'Doctor' ? 'justify-start' : 'justify-end'} ${isLatestMessage ? 'animate-[slideInUp_0.4s_ease-out]' : ''}`}
                                >
                                    <div className={`p-2 rounded-lg max-w-[85%] shadow-sm ${line.speaker === 'Doctor' ? 'bg-gray-200 text-gray-800' : 'bg-blue-500 text-white'}`}>
                                        <p className="text-xs">{line.text}</p>
                                    </div>
                                </div>
                            );
                        })}
                        {interim && (
                            <div className="flex justify-end opacity-80">
                                <div className="p-2 rounded-lg max-w-[85%] bg-blue-100 text-gray-800 border border-blue-200">
                                    <p className="text-xs">{interim}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
