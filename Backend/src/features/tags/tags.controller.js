import TagRepository from "./tags.repository.js";

export default class TagController {
    constructor() {
        // Instantiate the TagRepository to interact with the data source
        this.tagRepository = new TagRepository();
    }

    // Method to handle POST requests for adding tags
    async postTags(req, res, next) {
        try {
            // Extract uniqueTags from the request body
            const { uniqueTags } = req.body;

            // Call the addTags method of TagRepository to add the tags
            const result = await this.tagRepository.addTags(uniqueTags);

             // Check if the result indicates a successful operation
            if (result.success) {
                // Send a JSON response with status 200 and success message
                res.status(200).json({ success: true, data: result.data });
            } else {
                // Send a JSON response with status 400 and failure message
                res.status(400).json({ success: false, data: result.data });
            }
        } catch (error) {
             // Pass errors to the next middleware
            next(error);
        }
    }
    
    // Method to handle GET requests for fetching all tags
    async getAllTags(req,res,next){
        try {
            // Call the fetchAllTags method of TagRepository to get all tags
            const result = await this.tagRepository.fetchAllTags();
            // Check if the result indicates a successful operation
            if (result.success) {
                // Send a JSON response with status 200 and tags data
                res.status(200).json({ success: true, data: result.data });
            } else {
                // Send a JSON response with status 400 and failure message
                res.status(400).json({ success: false, data: result.data });
            }
            
        } catch (error) {
            // Pass errors to the next middleware
            next(error)
        }
    }
}
