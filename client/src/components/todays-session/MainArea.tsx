import { useState, useEffect } from 'react';
import TopActionButtons from './TopActionButtons';
import MedicationsSection from './MedicationsSection';
import TestsSection from './TestsSection';
import { FileText } from 'lucide-react';
import ReportViewer from './ReportViewer';
import PrescriptionModal from './PrescriptionModal';
import { useSession } from '../../contexts/SessionContext';
import { ProactiveReportSuggestion } from './ProactiveReportSuggestion';
import { useProactiveReportAgent } from '@/hooks/useProactiveReportAgent';

const MainArea = () => {
    const [isReportViewerOpen, setIsReportViewerOpen] = useState(false);
    const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
    const [selectedMedications, setSelectedMedications] = useState<string[]>([]);
    const [selectedTests, setSelectedTests] = useState<string[]>([]);
    const [proactiveReportVisible, setProactiveReportVisible] = useState(true);
    const { transcript, activePatient } = useSession();
    
    // Convert SessionContext transcript to the format expected by the agent
    const agentTranscript = transcript.map((entry, idx) => ({
        id: `${idx}`,
        timestamp: new Date(entry.timestamp).toLocaleTimeString(),
        speaker: entry.speaker as 'doctor' | 'patient',
        text: entry.text,
        confidence: 0.95,
    }));
    
    const { proactiveSuggestion, isProcessing } = useProactiveReportAgent({
        transcript: agentTranscript,
        patientId: activePatient?.id || 'patient_001',
        enabled: true,
    });

    // Debug logging
    useEffect(() => {
        console.log('📊 ProactiveSuggestion Status:', {
            suggestion: proactiveSuggestion?.title,
            visible: proactiveReportVisible && !!proactiveSuggestion,
            processing: isProcessing,
            transcriptLength: transcript.length,
        })
    }, [proactiveSuggestion, proactiveReportVisible, isProcessing, transcript.length])

    const toggleMedication = (medication: string) => {
        setSelectedMedications(prev =>
            prev.includes(medication)
                ? prev.filter(m => m !== medication)
                : [...prev, medication]
        );
    };

    const toggleTest = (test: string) => {
        setSelectedTests(prev =>
            prev.includes(test)
                ? prev.filter(t => t !== test)
                : [...prev, test]
        );
    };

    const handleProactiveReportDisplay = async (_report: any) => {
        // Handle displaying the proactive report
        setIsReportViewerOpen(true);
        setProactiveReportVisible(false);
    };


    return (
        <div className="h-full w-full bg-white p-6 flex flex-col overflow-hidden">
            <TopActionButtons />

            <div className="recommendations-area flex-1 flex flex-col min-h-0">
                <div className="flex gap-6 flex-1 min-h-0">
                    <MedicationsSection
                        selectedMedications={selectedMedications}
                        onToggleMedication={toggleMedication}
                    />

                    <TestsSection
                        selectedTests={selectedTests}
                        onToggleTest={toggleTest}
                    />
                </div>
            </div>

            {/* Generate Prescription Button */}
            <div className="flex justify-center mt-4 shrink-0">
                <button
                    onClick={() => setIsPrescriptionModalOpen(true)}
                    className="flex items-center gap-2 px-8 py-3 bg-white/70 backdrop-blur-sm text-gray-700 font-semibold border border-gray-300 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                    <FileText className="w-5 h-5" />
                    Generate Prescription
                </button>
            </div>

            <PrescriptionModal
                isOpen={isPrescriptionModalOpen}
                onClose={() => setIsPrescriptionModalOpen(false)}
                selectedMedications={selectedMedications}
                selectedTests={selectedTests}
                patientInfo={activePatient ? {
                    name: activePatient.name,
                    age: activePatient.age,
                    weight: activePatient.weight,
                    bp: activePatient.bp,
                    sugarLevel: activePatient.sugarLevel,
                    pastDiseases: activePatient.pastDiseases
                } : undefined}
                transcript={transcript}
            />

            <ReportViewer
                isOpen={isReportViewerOpen}
                onClose={() => setIsReportViewerOpen(false)}
            />

            <ProactiveReportSuggestion
                report={proactiveSuggestion}
                isVisible={proactiveReportVisible && !!proactiveSuggestion}
                onDismiss={() => setProactiveReportVisible(false)}
                onDisplay={handleProactiveReportDisplay}
                isProcessing={isProcessing}
            />
        </div>
    )
}

export default MainArea
