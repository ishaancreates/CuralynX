import React from 'react';

const TopActionButtons: React.FC = () => {
    return (
        <div className="top-action-buttons flex justify-between items-center mb-6 shrink-0">
            <div className="flex space-x-2">
                <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
                    Reports
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
                    History
                </button>
            </div>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                Skip Patient
            </button>
        </div>
    );
};

export default TopActionButtons;