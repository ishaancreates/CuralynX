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
    const [searchQuery, setSearchQuery] = React.useState('');
    const [searchResults, setSearchResults] = React.useState<string[]>([]);
    const [isSearching, setIsSearching] = React.useState(false);

    const tests = [
        'Complete Blood Count (CBC)',
        'Blood Sugar (Fasting)',
        'Lipid Profile',
        'Thyroid Function Test',
        'Chest X-Ray',
        'ECG'
    ];

    // Dummy database search function
    const searchTestsFromDB = React.useCallback((query: string) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);

        // Simulate API call delay
        setTimeout(() => {
            // Dummy database with more tests
            const dummyDB = [
                ...tests,
                'Liver Function Test (LFT)',
                'Kidney Function Test (KFT)',
                'Hemoglobin A1c (HbA1c)',
                'Vitamin D Test',
                'Vitamin B12 Test',
                'Uric Acid Test',
                'ESR (Erythrocyte Sedimentation Rate)',
                'CRP (C-Reactive Protein)',
                'Ultrasound Abdomen',
                'MRI Brain',
                'CT Scan Chest',
                'Stress Test (TMT)',
                'Echocardiography',
                'Pulmonary Function Test',
                'Colonoscopy',
                'Mammography',
                'PSA (Prostate-Specific Antigen)',
                'Stool Culture',
                'Urine Culture',
                'Blood Culture',
                'HIV Test',
                'Hepatitis B Surface Antigen',
                'Hepatitis C Antibody'
            ];

            // Search in dummy DB
            const results = dummyDB.filter(test =>
                test.toLowerCase().includes(query.toLowerCase())
            );

            setSearchResults(results);
            setIsSearching(false);
        }, 500);
    }, [tests]);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            searchTestsFromDB(searchQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery, searchTestsFromDB]);

    const displayTests = searchQuery.trim() ? searchResults : tests;

    return (
        <div className="flex-1 flex flex-col min-h-0">
            <h3 className="text-base font-semibold mb-3 text-gray-700 shrink-0">Recommended Tests</h3>
            <div className="flex-1 bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow border border-gray-200 overflow-y-auto">
                {/* Search Bar */}
                <div className="mb-3 sticky top-0 bg-white/90 backdrop-blur-sm z-10 pb-2">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search tests from database..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {isSearching && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                            </div>
                        )}
                    </div>
                    {searchQuery && (
                        <p className="text-xs text-gray-500 mt-1">
                            Found {displayTests.length} result{displayTests.length !== 1 ? 's' : ''}
                        </p>
                    )}
                </div>

                <div className="space-y-2.5 pb-16">
                    {displayTests.map((test) => (
                        <TestCard
                            key={test}
                            name={test}
                            isSelected={selectedTests.includes(test)}
                            onToggle={() => onToggleTest(test)}
                        />
                    ))}
                </div>
                <div className="sticky bottom-0 -mx-4 px-4 py-3 bg-white/80 backdrop-blur-sm border-t border-gray-200">
                    <button className="w-full h-11 px-4 text-sm font-medium bg-white/70 backdrop-blur-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300">
                        Proceed with Tests
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TestsSection;