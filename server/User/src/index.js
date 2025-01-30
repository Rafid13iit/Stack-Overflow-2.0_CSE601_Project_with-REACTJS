// src/index.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorHandle.js";
import userRoutes from "./routes/user.js";
// import cors from 'cors';

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

// app.use(cors({
//     origin: process.env.FRONTEND_URL || 'http://localhost:3000',
//     credentials: true
// }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`User service started on port ${port}`));
