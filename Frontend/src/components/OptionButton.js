import React from 'react';

const OptionButton = ({ option, isSelected, onClick }) => {
  return (
    <button
      className={`w-full px-4 py-2 rounded-lg border 
        ${isSelected 
          ? 'bg-blue-500 text-white' 
          : 'border-gray-300 bg-gray-200 hover:bg-blue-300 hover:text-white'
        }`}
      onClick={onClick}
    >
      {option}
    </button>
  );
};

export default OptionButton;
