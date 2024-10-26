// server.js - Main Application Entry Point
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import questionRoutes from './routes/Questions.js';
import answerRoutes from './routes/Answers.js';
import commentRoutes from './routes/Comments.js';
import notificationRoutes from './routes/Notification.js';
import { cleanupNotifications } from './controllers/Notification.js';

// Initialize Express application
const app = express();
dotenv.config(); // Load environment variables

// Middleware Configuration
app.use(express.json({limit: "30mb", extended: true})); // Parse JSON bodies
app.use(express.urlencoded({limit: "30mb", extended: true})); // Parse URL-encoded bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Base route handler
app.get('/',(req, res) => {
    res.send("This is a StackOverflow Clone API");
});

// Route Configurations
app.use('/user', userRoutes); // User-related routes (auth, profile)
app.use('/questions', questionRoutes); // Question-related routes
app.use('/answer', answerRoutes); // Answer-related routes
app.use('/comment', commentRoutes); // Comment-related routes
app.use('/notifications', notificationRoutes); // Notification-related routes

// Schedule daily notification cleanup
setInterval(cleanupNotifications, 24 * 60 * 60 * 1000);

// Server Configuration
const PORT = process.env.PORT || 8000;
const DATABASE_URL = process.env.CONNECTION_URL;

// Database Connection and Server Startup
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        cleanupNotifications(); // Initial cleanup on server start
    }))
    .catch((err) => console.log(err.message));
