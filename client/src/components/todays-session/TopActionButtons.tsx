const TopActionButtons = () => {
    return (
        <div className="flex justify-end gap-3 mb-6">
            <button className="px-4 py-2 text-red-300 font-medium rounded-lg border border-red-300/30 shadow-sm hover:bg-red-200/30 hover:text-red-500 hover:border-red-300/50 hover:shadow-md transition-all duration-300">
                Skip Patient
            </button>
            <button className="px-4 py-2 bg-red-500/20 backdrop-blur-lg text-red-600 font-medium rounded-lg border border-red-300/30 shadow-sm hover:bg-red-500/30 hover:text-red-700 hover:border-red-300/50 hover:shadow-md transition-all duration-300">
                End Session
            </button>
        </div>
    );
};

export default TopActionButtons;