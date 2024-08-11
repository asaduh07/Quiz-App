import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { connectToDb } from './src/config/db.config.js';
import tagRouter from './src/features/tags/tags.routes.js';
import questionRouter from './src/features/questions/questions.routes.js';
import ApplicationError from './src/errorHandler/applicationError.js';
dotenv.config();

const app = express();

// Middleware to enable CORS
app.use(cors());

// Middleware to parse incoming request bodies
app.use(bodyParser.json());

// Root endpoint to check if the API is running
app.get('/', (req, res) => {
    res.status(200).send("Welcome To the quiz app api");
});

// Route for tag-related operations
app.use('/api/tags', tagRouter);

// Route for question-related operations
app.use('/api/questions', questionRouter);

// Middleware to handle 404 errors
app.use((req, res) => {
    res.status(404).send("API not found");
});

// Middleware to handle server errors
app.use((err, req, res, next) => {
    console.log(err);
    
    if (err instanceof ApplicationError) {
        res.status(err.code).send(err.message);
    }
    res.status(500).send("Something went wrong, try again later");
});

// Start the server and connect to the database
app.listen(process.env.PORT, () => {
    console.log("Server is running at", process.env.PORT);
    connectToDb();
});
