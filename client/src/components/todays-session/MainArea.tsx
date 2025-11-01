import React, { useState } from 'react';
import TopActionButtons from './TopActionButtons';
import MedicationsSection from './MedicationsSection';
import TestsSection from './TestsSection';

const MainArea = () => {
    const [selectedMedications, setSelectedMedications] = useState<string[]>([]);
    const [selectedTests, setSelectedTests] = useState<string[]>([]);

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

    return (
        <div className="h-screen bg-white p-6 flex flex-col overflow-hidden">
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
        </div>
    )
}

export default MainArea