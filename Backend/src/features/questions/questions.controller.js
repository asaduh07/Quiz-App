import QuestionRepository from "./questions.repository.js";

export default class QuestionController {
    constructor() {
         // Initialize the repository for interacting with the Question model
        this.questionRepository = new QuestionRepository();
    }

    // Method to handle POST requests for adding questions
    async postQuestions(req, res, next) {
        try {
            // Extract the questions array from the request body
            const { questions } = req.body;
            // Call the repository method to add questions to the database
            const result = await this.questionRepository.addQuestions(questions);
            // Check if the operation was successful
            if (result.success) {
                res.status(200).json({ success: true, data: result.data });
            } 
        } catch (error) {
            next(error);
        }
    }

    // Method to handle GET requests for fetching questions by tags
    async getQuestionsByTags(req, res, next) {
        try {
            // Extract the selectedTags array from the request body
            const { selectedTags } = req.body;
            // Call the repository method to fetch questions based on the selected tags
            const result = await this.questionRepository.getQuestionsByTags(selectedTags);
            // Check if the operation was successful
            if (result.success) {
                // Send a success response with the fetched questions data
                res.status(200).json({ success: true, data: result.data });
            } 
        } catch (error) {
            next(error);
        }
    }
}
