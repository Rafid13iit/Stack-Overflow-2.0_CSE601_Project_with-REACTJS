// src/controllers/notification.js
import Notification from "../models/notifications.js";
import User from "../models/user.js";

export const getUnreadNotificationCount = async (req, res) => {
  try {
    const unreadCount = await Notification.countDocuments({
      user: req.user._id,
      read: false,
    });
    res.json({ count: unreadCount });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const markNotificationsAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user._id, read: false },
      { read: true }
    );
    res.status(200).json({ message: "Notifications marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const createPostNotification = async (post) => {
  try {
    const users = await User.find({ _id: { $ne: post.user._id } });
    const notifications = users.map((user) => ({
      user: user._id,
      post: post._id,
      message: `${post.user.name} uploaded a new post: "${post.title}"`,
      read: false,
    }));

    await Notification.insertMany(notifications);
  } catch (error) {
    console.error("Error creating notifications:", error);
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json({ message: "Notification deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const cleanOldNotifications = async () => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const result = await Notification.deleteMany({
      createdAt: { $lt: sevenDaysAgo },
    });
    console.log(`Deleted ${result.deletedCount} old notifications`);
  } catch (error) {
    console.error("Error cleaning old notifications:", error);
  }
};