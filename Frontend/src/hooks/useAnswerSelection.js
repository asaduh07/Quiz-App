import { useState } from 'react';

const useAnswerSelection = (questionType) => {
    // State to keep track of selected answers
  const [selectedAnswers, setSelectedAnswers] = useState([]); 

  // Handles selection/deselection of answers
  const handleAnswerChange = (answer) => {
    if (questionType === 'single') { // If the question is single-choice
      setSelectedAnswers((prevSelectedAnswers) => {
        if (prevSelectedAnswers.includes(answer)) {
          // If the same answer is clicked again, deselect it by returning an empty array
          return [];
        } else {
          // Otherwise, select the new answer
          return [answer];
        }
      });
    } else if (questionType === 'multiple') { // If the question is multiple-choice
      setSelectedAnswers((prevSelectedAnswers) => {
        if (prevSelectedAnswers.includes(answer)) {
          // Remove the answer if already selected
          return prevSelectedAnswers.filter(a => a !== answer);
        } else {
          // Add the answer to the array, if the maximum length is not reached
          return prevSelectedAnswers.length < 4 ? [...prevSelectedAnswers, answer] : prevSelectedAnswers;
        }
      });
    }
  };

  return { selectedAnswers, handleAnswerChange, setSelectedAnswers };
};

export default useAnswerSelection;
