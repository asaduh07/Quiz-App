import React from 'react';

const QuestionHeader = ({ question, currentQuestionIndex }) => {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-2">
        {currentQuestionIndex + 1 + '.'} {question.question}
      </h2>
      <h4 className='mb-2 text-red-600 font-bold'>
        ({question.type === 'single' ? 'Single Choice' : 'Multiple Choice'})
      </h4>
    </>
  );
};

export default QuestionHeader;
