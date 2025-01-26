// notification/src/utils/cronJobs.js
import cron from "node-cron";
import { cleanOldNotifications } from "../controllers/notification.js";

export const initializeCronJobs = () => {
  // Run cleanup at midnight every day
  cron.schedule("0 0 * * *", async () => {
    console.log("Running notification cleanup job...");
    await cleanOldNotifications();
  }, {
    timezone: "UTC"
  });

  console.log("Cron jobs initialized");
};