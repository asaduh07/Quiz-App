import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextQuestion, updateScore } from '../features/quiz/quizSlice';
import { quizSelector } from '../features/quiz/quizSlice';
import Timer from './Timer';
import QuestionHeader from './QuestionHeader';
import OptionButton from './OptionButton';
import useAnswerSelection from '../hooks/useAnswerSelection';

const Question = () => {
  const dispatch = useDispatch();
  // Extracting the current question and its index from the quiz state
  const { questions, currentQuestionIndex } = useSelector(quizSelector);
  const question = questions[currentQuestionIndex]; // Current question object

  // Use the custom hook for managing answer selection
  const { selectedAnswers, handleAnswerChange, setSelectedAnswers } = useAnswerSelection(question.type);

  // Handles submission of the selected answers
  const handleSubmit = () => {
    if (selectedAnswers.length > 0) {
      const correctAnswers = question.correct; // Correct answers for the current question
      let score = 0;

      if (question.type === 'single') { // Scoring for single-choice questions
        score = selectedAnswers[0] === correctAnswers[0] ? 4 : -2;
      } else if (question.type === 'multiple') { // Scoring for multiple-choice questions
        const correctCount = selectedAnswers.filter(a => correctAnswers.includes(a)).length;
        const incorrectCount = selectedAnswers.filter(a => !correctAnswers.includes(a)).length;
        score = (correctCount === correctAnswers.length) ? 4 : correctCount - incorrectCount;
      }

      dispatch(updateScore(score)); // Dispatch the score update
      dispatch(nextQuestion()); // Move to the next question
      setSelectedAnswers([]); // Reset selected answers after submission
    } else {
      console.error('Please select at least one answer before submitting.');
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <div className="bg-white p-4 my-4 rounded-lg shadow-md">
        {/* Question Section */}
        <QuestionHeader question={question} currentQuestionIndex={currentQuestionIndex} />
        <div className="space-y-2">
          {/* Rendering Options*/}
          {question.options.map((option) => (

            <OptionButton
              key={option}
              option={option}
              isSelected={selectedAnswers.includes(option)}
              onClick={() => handleAnswerChange(option)}
            />
          ))}
        </div>
        <div className="mt-4 w-full">
          <button
            className={`mt-4 px-6 w-full py-2 rounded-lg text-white 
              ${selectedAnswers.length > 0
                ? 'bg-green-600 hover:bg-green-600'
                : 'bg-gray-400 cursor-not-allowed'
              }`}
            onClick={handleSubmit}
            disabled={selectedAnswers.length === 0} // Disable the button if no answers are selected
          >
            Submit
          </button>
        </div>
      </div>
      <div>
        {/* Timer component */}
        <Timer />
      </div>
    </div>
  );
};

export default Question;
