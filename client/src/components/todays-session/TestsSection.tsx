import React from 'react';
import TestCard from './TestCard';

interface TestsSectionProps {
    selectedTests: string[];
    onToggleTest: (test: string) => void;
}

const TestsSection: React.FC<TestsSectionProps> = ({
    selectedTests,
    onToggleTest
}) => {
    const tests = [
        'Complete Blood Count (CBC)',
        'Blood Sugar (Fasting)',
        'Lipid Profile',
        'Thyroid Function Test',
        'Chest X-Ray',
        'ECG'
    ];

    return (
        <div className="flex-1 flex flex-col min-h-0">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 shrink-0"> Recommended Tests</h3>
            <div className="flex-1 bg-white/70 backdrop-blur-sm p-5 rounded-lg shadow-md border border-gray-200 overflow-y-auto">
                <div className="space-y-3">
                    {tests.map((test) => (
                        <TestCard
                            key={test}
                            name={test}
                            isSelected={selectedTests.includes(test)}
                            onToggle={() => onToggleTest(test)}
                        />
                    ))}
                </div>
            </div>
            <button className="mt-5 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-md hover:shadow-lg shrink-0">
                Proceed with Tests
            </button>
        </div>
    );
};

export default TestsSection;