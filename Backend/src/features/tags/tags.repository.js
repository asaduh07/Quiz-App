import ApplicationError from "../../errorHandler/applicationError.js";
import TagModel from "./tags.schema.js";

export default class TagRepository {

    // Method to add tags to the database
    async addTags(tags) {
        try {
            /// Array to hold the results of tag insertion
            const results = [];
            // Iterate over the array of tags
            for (const tag of tags) {
                // Check if the tag already exists in the database
                const existingTag = await TagModel.findOne({ name: tag });
                if (!existingTag) {
                    // If the tag does not exist, create a new TagModel instance
                    const newTag = new TagModel({ name: tag });
                    // Save the new tag to the database
                    const result = await newTag.save();
                    // Add the result to the results array
                    results.push(result);
                }
            }
            // Return a success response with the results of tag insertion
            return { success: true, data: results };
        } catch (error) {
            console.log(error);
            // Throw a custom ApplicationError with a generic message
            throw new ApplicationError('Something went wrong, please try again later', 500);
        }
    }

    // Method to fetch tags from the database
    async fetchAllTags() {
        try {
            // Retrieve all tags from the database
            const tags = await TagModel.find();
            // Check if any tags were found
            if (tags.length) {
                // Return a success response with the tags
                return { success: true, data: tags }
            } else {
                // Return a failure response if no tags were found
                return { success: false, data: "No tag found" }
            }

        } catch (error) {
            console.log(error);
            // Throw a custom ApplicationError with a generic message
            throw new ApplicationError('Something went wrong, please try again later', 500);
        }
    }
}
