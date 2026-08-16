import React from 'react';
import { X, Download, Printer, Zap } from 'lucide-react';

interface PrescriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedMedications: string[];
    selectedTests: string[];
    patientInfo?: {
        name: string;
        age: number;
        weight: string;
        bp: string;
        sugarLevel: string;
        pastDiseases: string;
    };
    transcript: { speaker: string; text: string }[];
    onApproveWorkflow?: () => Promise<void>;
}

// Print-specific styles
const printStyles = `
@media print {
    body * {
        visibility: hidden;
    }
    
    .print-prescription-only, 
    .print-prescription-only * {
        visibility: visible;
    }
    
    .print-prescription-only {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: white;
        padding: 0;
        margin: 0;
    }
    
    .no-print,
    .print-hide {
        display: none !important;
    }
    
    @page {
        margin: 0.75in 0.5in;
        size: A4 portrait;
    }
    
    .print-prescription-only {
        page-break-after: auto;
    }
    
    .print-prescription-only table {
        page-break-inside: avoid;
    }
}

@media screen {
    .print-prescription-only {
        display: none;
    }
}
`;

const PrescriptionModal: React.FC<PrescriptionModalProps> = ({
    isOpen,
    onClose,
    selectedMedications,
    selectedTests,
    patientInfo,
    transcript,
    onApproveWorkflow
}) => {
    if (!isOpen) return null;

    // SOAP Components
    // Subjective - Patient's statements
    const subjective = transcript
        .filter(t => t.speaker.toLowerCase() === 'patient')
        .map(t => t.text)
        .join(' ');

    // Objective - Vitals and observations
    const objective = {
        vitals: {
            bp: patientInfo?.bp || 'Not recorded',
            weight: patientInfo?.weight || 'Not recorded',
            sugar: patientInfo?.sugarLevel || 'Not recorded',
        },
        pastHistory: patientInfo?.pastDiseases || 'None reported'
    };

    // Assessment - Doctor's diagnosis
    const assessment = transcript
        .filter(t => t.speaker.toLowerCase() === 'doctor')
        .slice(-3)
        .map(t => t.text)
        .join('. ');

    // Plan - Medications and tests
    const plan = {
        medications: selectedMedications,
        investigations: selectedTests
    };

    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        const soapText = `
MEDICAL CONSULTATION NOTE - SOAP FORMAT
========================================

Date: ${currentDate}
Patient: ${patientInfo?.name || 'N/A'}
Age: ${patientInfo?.age || 'N/A'} years

SUBJECTIVE (Chief Complaint & History):
${subjective || 'Not documented'}

OBJECTIVE (Clinical Findings):
Vitals:
- Blood Pressure: ${objective.vitals.bp}
- Weight: ${objective.vitals.weight}
- Blood Sugar: ${objective.vitals.sugar}

Past Medical History: ${objective.pastHistory}

ASSESSMENT (Diagnosis):
${assessment || 'Clinical assessment pending'}

PLAN (Treatment & Management):

Medications Prescribed:
${plan.medications.map((med, i) => `${i + 1}. ${med}`).join('\n')}

Investigations Ordered:
${plan.investigations.map((test, i) => `${i + 1}. ${test}`).join('\n')}

General Advice:
- Take medicines after meals
- Drink plenty of water (8-10 glasses per day)
- Complete the full course of prescribed medicines
- Follow up if symptoms persist or worsen

========================================
Generated: ${new Date().toLocaleString()}
        `.trim();

        const blob = new Blob([soapText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `SOAP_Note_${patientInfo?.name || 'Patient'}_${Date.now()}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleApproveWorkflow = async () => {
        if (onApproveWorkflow) {
            await onApproveWorkflow();
        }
    };

    return (
        <div>
            <style>{printStyles}</style>

            {/* Simplified Print-Only Prescription for stability */}
            <div className="print-prescription-only p-6">
                <div className="max-w-[8.5in] mx-auto bg-white p-4">
                    <h1 className="text-2xl font-bold text-gray-900">Dr. Curalynx</h1>
                    <p className="text-sm text-gray-600">{patientInfo?.name || 'Patient'}</p>

                    <h3 className="mt-4 font-semibold">Medications</h3>
                    {selectedMedications.length > 0 ? (
                        <ul className="list-decimal pl-6 mt-2 text-sm">
                            {selectedMedications.map((m, i) => (
                                <li key={i} className="text-gray-800">{m}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-600">No medications prescribed</p>
                    )}
                </div>
            </div>

            {/* Screen Modal - simplified SOAP view */}
            <div className="print-hide fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-auto">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#5a7a5a] to-[#7a9a7a] text-white">
                        <div>
                            <h2 className="text-lg font-bold">Medical Consultation Note</h2>
                            <p className="text-xs">SOAP Format</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={handleDownload} className="p-2">
                                <Download className="w-5 h-5 text-white" />
                            </button>
                            <button onClick={handlePrint} className="p-2">
                                <Printer className="w-5 h-5 text-white" />
                            </button>
                            <button onClick={onClose} className="p-2">
                                <X className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>

                    <div className="p-6 space-y-4">
                        <div>
                            <h4 className="font-semibold">Subjective</h4>
                            <p className="text-sm text-gray-700">{subjective || 'None'}</p>
                        </div>

                        <div>
                            <h4 className="font-semibold">Assessment</h4>
                            <p className="text-sm text-gray-700">{assessment || 'Pending'}</p>
                        </div>

                        <div>
                            <h4 className="font-semibold">Plan</h4>
                            {plan.medications.length > 0 ? (
                                <ul className="list-decimal pl-6 text-sm">
                                    {plan.medications.map((m, i) => <li key={i}>{m}</li>)}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-600">No plan documented</p>
                            )}
                        </div>
                    </div>

                    <div className="no-print p-4 flex justify-end gap-3 border-t">
                        <button onClick={onClose} className="px-4 py-2 bg-white border rounded">Close</button>
                        <button onClick={handlePrint} className="px-4 py-2 bg-green-600 text-white rounded">Print</button>
                        {onApproveWorkflow && (
                            <button onClick={handleApproveWorkflow} className="px-4 py-2 bg-emerald-600 text-white rounded flex items-center gap-2">
                                <Zap className="w-4 h-4" /> Approve & Run Workflow
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrescriptionModal;
