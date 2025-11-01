import React from 'react';

// Timeline interfaces
interface TimelineCategory {
    tag: string;
    color: string;
}

interface TimelineLink {
    url: string;
    text: string;
}

interface TimelineData {
    text: string;
    date: string;
    category: TimelineCategory;
    link?: TimelineLink;
}

// Timeline data structure
const timelineData: TimelineData[] = [
    {
        text: 'Initial consultation and diagnosis',
        date: 'March 15, 2024',
        category: {
            tag: 'consultation',
            color: '#10b981'
        },
        link: {
            url: '#',
            text: 'View Details'
        }
    },
    {
        text: 'Blood work and lab results completed',
        date: 'March 18, 2024',
        category: {
            tag: 'lab work',
            color: '#f59e0b'
        },
        link: {
            url: '#',
            text: 'View Results'
        }
    },
    {
        text: 'Started medication treatment plan',
        date: 'March 22, 2024',
        category: {
            tag: 'treatment',
            color: '#3b82f6'
        },
        link: {
            url: '#',
            text: 'View Plan'
        }
    },
    {
        text: 'Follow-up appointment - positive progress',
        date: 'April 05, 2024',
        category: {
            tag: 'follow-up',
            color: '#8b5cf6'
        }
    },
    {
        text: 'X-ray and imaging completed',
        date: 'April 12, 2024',
        category: {
            tag: 'imaging',
            color: '#ef4444'
        },
        link: {
            url: '#',
            text: 'View Images'
        }
    }
];

// Compact Timeline Item Component
const TimelineItem = ({ data, index }: { data: TimelineData, index: number }) => (
    <div className="flex items-start gap-3 mb-4 last:mb-0">
        {/* Date column */}
        <div className="w-24 flex-shrink-0 text-right pt-1">
            <time className="text-xs font-semibold text-[#5a7a5a]">
                {data.date}
            </time>
        </div>
        
        {/* Connector */}
        <div className="flex flex-col items-center pt-1.5">
            <div className="w-3 h-3 rounded-full bg-[#7a9a7a] border-2 border-white shadow-sm"></div>
            {index < timelineData.length - 1 && (
                <div className="w-0.5 h-full bg-[#7a9a7a] opacity-30 mt-1"></div>
            )}
        </div>
        
        {/* Content */}
        <div className="flex-1 pb-4">
            <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                <span
                    className="inline-block text-white text-xs font-semibold px-2 py-0.5 rounded mb-2"
                    style={{ backgroundColor: data.category.color }}
                >
                    {data.category.tag}
                </span>
                <p className="text-sm text-gray-700 mb-1">{data.text}</p>
                {data.link && (
                    <a
                        href={data.link.url}
                        className="text-xs text-[#5a7a5a] hover:text-[#7a9a7a] font-medium"
                    >
                        {data.link.text} →
                    </a>
                )}
            </div>
        </div>
    </div>
);

const PatientTimeline = () => {
    // Patient data
    const patientData = {
        name: "Ishaan Pandey",
        gender: "Male",
        age: 21
    };

    return (
        <div className="min-h-screen bg-white p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="border-l-4 border-[#5a7a5a] bg-gray-50 p-6 mb-6 flex justify-between items-center">
                    <div>
                        <div className="text-2xl font-bold text-[#5a7a5a] mb-1">{patientData.name}</div>
                        <div className="text-sm text-gray-600">{patientData.gender} | {patientData.age} years old</div>
                    </div>
                    <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt={patientData.name}
                        className="w-16 h-16 rounded-full border-2 border-[#7a9a7a] object-cover"
                    />
                </div>

                {/* Timeline Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h2 className="text-lg font-bold text-[#5a7a5a] mb-6 border-b-2 border-[#7a9a7a] pb-2">
                        Medical History
                    </h2>
                    
                    <div className="bg-white p-4 rounded">
                        {timelineData.map((data, idx) => (
                            <TimelineItem data={data} key={idx} index={idx} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientTimeline;
