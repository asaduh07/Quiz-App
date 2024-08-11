import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { quizSelector, selectTag, removeTag, resetTags } from '../features/quiz/quizSlice';
import { fetchTags,fetchQuestions } from '../features/quiz/thunks'
import { useNavigate } from 'react-router-dom';
import TagGrid from '../components/TagGrid';
import ControlButtons from '../components/ControlButtons';


const HomePage = () => {
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const { tags, selectedTags,tagCount } = useSelector(quizSelector);

    useEffect(() => {
        dispatch(fetchTags()); // Fetch tags when the component mounts
    }, [dispatch]);

    const handleTagClick = (tagName) => {
        // Toggle the tag selection
        if (selectedTags.includes(tagName)) {
            dispatch(removeTag(tagName));
        } else if (selectedTags.length < tagCount) {
            dispatch(selectTag(tagName));
        }
    };

    const handleReset = () => {
        // Reset all selected tags
        if (selectedTags.length > 0) {
            dispatch(resetTags());
        }
    }

    const handleStart=async ()=>{
        try {
            // Fetch questions based on selected tags and navigate to the quiz page
            await dispatch(fetchQuestions({ selectedTags }));
            navigate('/questions');
        } catch (error) {
            console.error("Failed to fetch questions:", error);
            // Handle error (e.g., show a message to the user)
        }
    }

    return (
        <div className="container mx-auto p-4 max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl">
            <h1 className="text-4xl font-bold text-center text-red-900 mb-4">Welcome to the Quiz App!</h1>
            <div className="text-center mb-4">
                <p className="text-lg font-bold">
                    {`Select ${tagCount - selectedTags.length} ${selectedTags.length > 0 ? 'more' : ''} ${tagCount - selectedTags.length === 1 ? 'tag' : 'tags'} to start the quiz.`}
                </p>
            </div>
            <TagGrid tags={tags} selectedTags={selectedTags} onTagClick={handleTagClick} />
            <ControlButtons
                selectedTags={selectedTags}
                tagCount={tagCount}
                onReset={handleReset}
                onStart={handleStart}
            />
        </div>
    );
};

export default HomePage;
