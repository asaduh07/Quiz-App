import express from 'express';
import TagController from './tags.controller.js';

const tagRouter = express.Router(); // Create an Express router instance
const tagController = new TagController(); // Instantiate the TagController

// Route to handle POST requests for adding tags
tagRouter.route('/')
    .post((req, res, next) => {
        // Call the postTags method of TagController to handle the request
        tagController.postTags(req, res, next);
    });
// Route to handle GET requests to fetch all tags   
tagRouter.route('/')
    .get((req, res, next) => {
        // Call the getAllTags method of TagController to handle the request
        tagController.getAllTags(req, res, next);
    });

export default tagRouter;
