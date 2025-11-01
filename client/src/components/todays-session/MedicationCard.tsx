import React from 'react';

interface MedicationCardProps {
    name: string;
    dosageOptions: string[];
    frequencyOptions: { value: string; label: string }[];
    defaultDosage: string;
    defaultFrequency: string;
    isSelected: boolean;
    onToggle: () => void;
}

const MedicationCard: React.FC<MedicationCardProps> = ({
    name,
    dosageOptions,
    frequencyOptions,
    defaultDosage,
    defaultFrequency,
    isSelected,
    onToggle
}) => {
    return (
        <div
            onClick={onToggle}
            className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${isSelected
                    ? 'bg-blue-50 border-blue-500 shadow-lg'
                    : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                }`}
        >
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <span className="text-sm font-medium text-gray-800">{name}</span>
                </div>
                <div className="flex items-center gap-2">
                    <select
                        className="text-xs border rounded px-2 py-1 bg-white"
                        onClick={(e) => e.stopPropagation()}
                        defaultValue={defaultDosage}
                    >
                        {dosageOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                    <select
                        className="text-xs border rounded px-2 py-1 bg-white"
                        onClick={(e) => e.stopPropagation()}
                        defaultValue={defaultFrequency}
                    >
                        {frequencyOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            </div>
            {isSelected && (
                <div className="mt-2 text-blue-500 text-xs">✓ Selected</div>
            )}
        </div>
    );
};

export default MedicationCard;