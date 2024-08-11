import ApplicationError from "../../errorHandler/applicationError.js";
import QuestionModel from "./questions.schema.js";

export default class QuestionRepository {

    // Method to add questions to the database
    async addQuestions(questions) {
        try {
            /// Array to store results of the saved questions
            const results = [];
            // Iterate over each question and save it to the database
            for (const question of questions) {
                // Create a new QuestionModel instance for each question
                const newQuestion = new QuestionModel(question);
                // Save the question to the database
                const result = await newQuestion.save();
                // Collect the result
                results.push(result);
            }
            // Return success response with the saved results
            return { success: true, data: results };
        } catch (error) {
            console.log(error);
            throw new ApplicationError('Something went wrong, please try again later', 500);
        }
    }

    
    // Method to get questions based on tags (MATCHING ENGINE)
    async getQuestionsByTags(selectedTags) {
        try {
            // Fetch all questions that have at least one of the selected tags
            const questions = await QuestionModel.find({ tags: { $in: selectedTags } });
            // Function to count matching tags
            const countMatchedTags = (questionTags, selectedTags) => {
                return questionTags.filter(tag => selectedTags.includes(tag)).length;
            };

            // Add a matchCount to each question based on the number of matched tags
            const questionsWithMatchCount = questions.map(question => ({
                ...question.toObject(), // Convert Mongoose document to plain object
                matchCount: countMatchedTags(question.tags, selectedTags)
            }));

            // Sort questions by matchCount in descending order and take the top 10
            const topQuestions = questionsWithMatchCount
                .sort((a, b) => b.matchCount - a.matchCount)
                .slice(0, 10);
                

            return { success: true, data: topQuestions };
        } catch (error) {
            console.error(error);
            throw new ApplicationError('Unable to retrieve questions, please try again later', 500);
        }
    }
}
