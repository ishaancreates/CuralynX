import React from 'react';
import { X, Download, Printer } from 'lucide-react';

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
}

const PrescriptionModal: React.FC<PrescriptionModalProps> = ({
    isOpen,
    onClose,
    selectedMedications,
    selectedTests,
    patientInfo,
    transcript
}) => {
    if (!isOpen) return null;

    // Extract symptoms from transcript (patient's statements)
    const symptoms = transcript
        .filter(t => t.speaker.toLowerCase() === 'patient')
        .map(t => t.text)
        .join('; ');

    // Generate assessment from doctor's observations
    const assessment = transcript
        .filter(t => t.speaker.toLowerCase() === 'doctor')
        .slice(-3) // Last 3 doctor statements
        .map(t => t.text)
        .join('. ');

    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        const prescriptionText = document.getElementById('prescription-content')?.innerText;
        const blob = new Blob([prescriptionText || ''], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Prescription_${patientInfo?.name || 'Patient'}_${Date.now()}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Medical Prescription</h2>
                        <p className="text-sm text-gray-500 mt-1">SOAP Format</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleDownload}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Download"
                        >
                            <Download className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handlePrint}
                            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Print"
                        >
                            <Printer className="w-5 h-5" />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6" id="prescription-content">
                    {/* Patient Information */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Patient Information</h3>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <span className="font-medium text-gray-600">Name:</span>
                                <span className="ml-2 text-gray-800">{patientInfo?.name || 'N/A'}</span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-600">Age:</span>
                                <span className="ml-2 text-gray-800">{patientInfo?.age || 'N/A'} years</span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-600">Weight:</span>
                                <span className="ml-2 text-gray-800">{patientInfo?.weight || 'N/A'}</span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-600">BP:</span>
                                <span className="ml-2 text-gray-800">{patientInfo?.bp || 'N/A'}</span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-600">Blood Sugar:</span>
                                <span className="ml-2 text-gray-800">{patientInfo?.sugarLevel || 'N/A'}</span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-600">Date:</span>
                                <span className="ml-2 text-gray-800">{currentDate}</span>
                            </div>
                        </div>
                        {patientInfo?.pastDiseases && patientInfo.pastDiseases !== 'None' && (
                            <div className="mt-3 text-sm">
                                <span className="font-medium text-gray-600">Medical History:</span>
                                <span className="ml-2 text-gray-800">{patientInfo.pastDiseases}</span>
                            </div>
                        )}
                    </div>

                    {/* SOAP Format */}
                    <div className="space-y-6">
                        {/* Subjective */}
                        <div>
                            <h3 className="text-lg font-semibold text-blue-600 mb-2 flex items-center gap-2">
                                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">S</span>
                                Subjective (Patient's Complaints)
                            </h3>
                            <div className="pl-10 text-gray-700 text-sm leading-relaxed">
                                {symptoms || 'No specific complaints recorded'}
                            </div>
                        </div>

                        {/* Objective */}
                        <div>
                            <h3 className="text-lg font-semibold text-green-600 mb-2 flex items-center gap-2">
                                <span className="bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">O</span>
                                Objective (Clinical Findings)
                            </h3>
                            <div className="pl-10 text-gray-700 text-sm">
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Blood Pressure: {patientInfo?.bp || 'Not recorded'}</li>
                                    <li>Blood Sugar Level: {patientInfo?.sugarLevel || 'Not recorded'}</li>
                                    <li>Weight: {patientInfo?.weight || 'Not recorded'}</li>
                                </ul>
                            </div>
                        </div>

                        {/* Assessment */}
                        <div>
                            <h3 className="text-lg font-semibold text-orange-600 mb-2 flex items-center gap-2">
                                <span className="bg-orange-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">A</span>
                                Assessment (Diagnosis)
                            </h3>
                            <div className="pl-10 text-gray-700 text-sm leading-relaxed">
                                {assessment || 'Assessment based on clinical examination and patient history'}
                            </div>
                        </div>

                        {/* Plan */}
                        <div>
                            <h3 className="text-lg font-semibold text-purple-600 mb-2 flex items-center gap-2">
                                <span className="bg-purple-100 text-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">P</span>
                                Plan (Treatment)
                            </h3>
                            <div className="pl-10 space-y-4">
                                {/* Medications */}
                                {selectedMedications.length > 0 && (
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-2">Prescribed Medications:</h4>
                                        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                                            {selectedMedications.map((med, index) => (
                                                <li key={index}>{med}</li>
                                            ))}
                                        </ol>
                                    </div>
                                )}

                                {/* Tests */}
                                {selectedTests.length > 0 && (
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-2">Recommended Tests:</h4>
                                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                                            {selectedTests.map((test, index) => (
                                                <li key={index}>{test}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {selectedMedications.length === 0 && selectedTests.length === 0 && (
                                    <p className="text-sm text-gray-500 italic">No medications or tests selected</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <p className="text-xs text-gray-500 italic">
                            This prescription is generated based on the consultation session. Please follow up as advised.
                        </p>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                        Close
                    </button>
                    <button
                        onClick={handlePrint}
                        className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        Print Prescription
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrescriptionModal;
