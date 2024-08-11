import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { quizSelector } from '../features/quiz/quizSlice';

const ProtectedRoute = ({ children }) => {
  // Extracting the selectedTags and tagCount from the quiz state using the quizSelector
  const { selectedTags,tagCount } = useSelector(quizSelector);
  
  // Checking if the number of selected tags matches the required tagCount
  // If the condition is true, render the child components (e.g., QuizPage, ResultPage)
  // If the condition is false, redirect the user to the home page ("/")
  return selectedTags.length === tagCount ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
