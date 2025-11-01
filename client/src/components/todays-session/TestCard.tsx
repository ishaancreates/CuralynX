import React from 'react';

interface TestCardProps {
    name: string;
    isSelected: boolean;
    onToggle: () => void;
}

const TestCard: React.FC<TestCardProps> = ({ name, isSelected, onToggle }) => {
    return (
        <div
            onClick={onToggle}
            className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${isSelected
                    ? 'bg-blue-50 border-blue-500 shadow-lg'
                    : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                }`}
        >
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-800">{name}</span>
            </div>
            {isSelected && (
                <div className="mt-2 text-blue-500 text-xs">✓ Selected</div>
            )}
        </div>
    );
};

export default TestCard;