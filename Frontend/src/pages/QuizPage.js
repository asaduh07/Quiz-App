import React from 'react';
import { useSelector } from 'react-redux';
import { quizSelector } from '../features/quiz/quizSlice';
import Question from '../components/Question';
import Loader from '../components/Loader';
import ResultPage from './ResultPage';
const QuizPage = () => {
  const { questions, isQuizFinished } = useSelector(quizSelector);

  // If the quiz is finished, navigate to the ResultPage
  if (isQuizFinished) {
    return (
      <ResultPage />
    );
  }

  // If the questions are not yet loaded, show a loader
  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <Loader />
      </div>
    );
  }
  
  // Display the current question
  return (
    <div className="container mx-auto my-16 p-4 max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl">
      <Question />
    </div>
  );
};

export default QuizPage;
