import express from 'express';
import QuestionController from './questions.controller.js';

const questionRouter = express.Router();
const questionController = new QuestionController();

// Route to handle POST requests for adding questions
questionRouter.route('/')
    .post((req, res, next) => {
        questionController.postQuestions(req, res, next);
    });

// Route to handle POST requests for fetching questions by tags
questionRouter.route('/filter')
    .post((req, res, next) => {
        questionController.getQuestionsByTags(req, res, next);
    });

export default questionRouter;
