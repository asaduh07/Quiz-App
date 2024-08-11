import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementTimer, nextQuestion } from '../features/quiz/quizSlice'; // Import nextQuestion action
import { quizSelector } from '../features/quiz/quizSlice';

const Timer = () => {
  const dispatch = useDispatch();

  // Extracting timer and isQuizFinished state from the Redux store
  const { timer, isQuizFinished } = useSelector(quizSelector);

  useEffect(() => {
    // Do nothing if quiz is finished or timer already hit zero
    if (isQuizFinished || timer <= 0) {
      return;
    }

    // Set up an interval that ticks every second (1000ms)
    const interval = setInterval(() => {
      if (timer <= 1) {
        // If the timer reaches 1 second, clear the interval and move to the next question
        clearInterval(interval);
        dispatch(nextQuestion()); // Dispatch nextQuestion when timer reaches zero
      } else {
        // Otherwise, decrement the timer by 1 second
        dispatch(decrementTimer()); // Decrement timer normally
      }
    }, 1000);

    // Cleanup function to clear the interval if the component unmounts or if dependencies change
    return () => clearInterval(interval);
  }, [dispatch, timer, isQuizFinished]);

  return <div className="text-3xl">
    Time left: <span className={timer <= 5 ? 'text-red-500' : ''}>{timer}s</span>
  </div>
};

export default Timer;
