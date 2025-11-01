const TopActionButtons = () => {
    return (
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
                {/* <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">H</span>
                </div> */}
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-600 to-gray-600 bg-clip-text text-transparent">
                    Curalynx
                </h1>
            </div>
            <div className="flex gap-3">
                <button className="px-4 py-2 text-red-300 font-medium rounded-lg border border-red-300/30 shadow-sm hover:bg-red-200/30 hover:text-red-500 hover:border-red-300/50 hover:shadow-md transition-all duration-300">
                    Skip Patient
                </button>
                <button className="px-4 py-2 bg-red-500/20 backdrop-blur-lg text-red-600 font-medium rounded-lg border border-red-300/30 shadow-sm hover:bg-red-500/30 hover:text-red-700 hover:border-red-300/50 hover:shadow-md transition-all duration-300">
                    End Session
                </button>
            </div>
        </div>
    );
};

export default TopActionButtons;