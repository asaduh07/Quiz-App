import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
    // The text of the question
    question: { type: String, required: true },
    // The possible answer options for the question
    options: { type: [String], required: true },
    // The correct answer(s) for the question
    correct: { type: [String], required: true },
    // The type of question (e.g., single choice, multiple choice)
    type: { type: String, required: true },
    // Tags associated with the question for categorization or filtering
    tags: { type: [String], required: true },
});

// Create and export the Question model
const QuestionModel =mongoose.model('Question', QuestionSchema);
export default QuestionModel;

