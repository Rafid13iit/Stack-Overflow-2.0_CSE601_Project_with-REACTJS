// src/index.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorHandle.js";
import notificationRoutes from "./routes/notification.js";
import { cleanOldNotifications } from "./controllers/notification.js";
import cron from "node-cron";

dotenv.config();

const port = process.env.PORT || 5002;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/notifications", notificationRoutes);

// Schedule notification cleanup
cron.schedule("0 0 * * *", cleanOldNotifications, {
  timezone: "UTC",
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Notification service started on port ${port}`));