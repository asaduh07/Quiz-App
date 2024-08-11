import React from 'react';

// ControlButtons is responsible for rendering the Reset and Start Quiz buttons
const ControlButtons = ({ selectedTags, tagCount, onReset, onStart }) => {
    return (
        <div className="mt-4 text-center space-x-5">
            {/* Reset Button */}
            <button
                className={`px-6 py-2 rounded-lg text-white ${
                    selectedTags.length > 0
                        ? 'bg-red-500 hover:bg-red-800'
                        : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={selectedTags.length === 0} // Disable button if no tags are selected
                onClick={onReset} // Handle reset action when clicked
            >
                Reset
            </button>

            {/* Start Quiz Button */}
            <button
                className={`px-6 py-2 rounded-lg text-white ${
                    selectedTags.length === tagCount
                        ? 'bg-blue-500 hover:bg-blue-800'
                        : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={selectedTags.length !== tagCount} // Disable button if required number of tags are not selected
                onClick={onStart} // Handle quiz start action when clicked
            >
                Start Quiz
            </button>
        </div>
    );
};

export default ControlButtons;
