import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetQuiz, quizSelector } from '../features/quiz/quizSlice';
import { useNavigate } from 'react-router-dom';

const ResultPage = () => {
  const dispatch = useDispatch(); // Used to dispatch actions
  const navigate = useNavigate(); // Used to navigate to different routes
  const { score } = useSelector(quizSelector); // Get the current score from the Redux store

  // Function to handle quiz reset
  const handleResetQuiz = () => {
    dispatch(resetQuiz()); // Dispatch an action to reset the quiz state
    navigate('/'); // Navigate back to the home page
  }


  // Render the result page with the score and reset button
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 text-red-900">Quiz Finished!</h1>
        <p className="text-xl font-bold">Your score: {score} </p>
        <button onClick={handleResetQuiz} className={`mt-4 px-6 py-2 rounded-lg text-white bg-green-600 hover:bg-green-800`} >Reset quiz</button>
      </div>
    </div>
  );
};

export default ResultPage;
