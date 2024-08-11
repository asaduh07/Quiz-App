import React from 'react';

// TagGrid is responsible for displaying a grid of tags with the ability to select and deselect tags
const TagGrid = ({ tags, selectedTags, onTagClick }) => {
    return (
        <div className="grid grid-cols-4 gap-4">
            {tags.map(tag => (
                <button
                    key={tag._id}
                    onClick={() => onTagClick(tag.name)} // Handle tag selection/deselection when clicked
                    className={`p-2 rounded-lg border-2 break-all ${
                        selectedTags.includes(tag.name)
                            ? 'bg-green-600 text-white hover:border-black'
                            : 'bg-gray-200 text-black hover:border-black'
                    }`}
                >
                    {tag.name} 
                </button>
            ))}
        </div>
    );
};

export default TagGrid;
