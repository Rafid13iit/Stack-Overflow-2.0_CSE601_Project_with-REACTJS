// src/index.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorHandle.js";
import postRoutes from "./routes/post.js";

dotenv.config();

const port = process.env.PORT || 5001;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/posts", postRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Post service started on port ${port}`));