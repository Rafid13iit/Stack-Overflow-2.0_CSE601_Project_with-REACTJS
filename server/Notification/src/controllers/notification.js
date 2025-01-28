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

// export const createPostNotification = async (post) => {
//   try {
//     if (!post || !post.user || !post.user._id) {
//       console.error("Invalid post object:", post); // Log the post object for debugging
//       throw new Error("Invalid post object");
//     }

//     const users = await User.find({ _id: { $ne: post.user._id } });
//     const notifications = users.map((user) => ({
//       user: user._id,
//       post: post._id,
//       message: `${post.user.name} uploaded a new post: "${post.title}"`,
//       read: false,
//     }));

//     await Notification.insertMany(notifications);
//   } catch (error) {
//     console.error("Error creating notifications:", error);
//   }
// };

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

export const handleServiceNotification = async (req, res) => {
  try {
    const { type, post, userId } = req.body;

    if (!type || !post || !userId) {
      return res.status(400).json({ 
        message: "Missing required fields" 
      });
    }

    switch (type) {
      case 'POST_CREATED':
        await createPostNotification(post);
        break;
      // Add other notification types here
      default:
        return res.status(400).json({ 
          message: "Invalid notification type" 
        });
    }

    res.status(201).json({ message: "Notification created successfully" });
  } catch (error) {
    console.error("Error handling service notification:", error);
    res.status(500).json({ 
      message: "Failed to create notification",
      error: error.message 
    });
  }
};

export const createPostNotification = async (post) => {
  try {
    if (!post?.user?._id || !post?.title) {
      throw new Error("Invalid post data");
    }

    // Find all users except the post creator
    const users = await User.find({ 
      _id: { $ne: post.user._id } 
    });

    // Create notifications for each user
    const notifications = users.map(user => ({
      user: user._id,
      post: post._id,
      message: `${post.user.name} uploaded a new post: "${post.title}"`,
      read: false,
      type: 'POST_CREATED'
    }));

    if (notifications.length > 0) {
      await Notification.insertMany(notifications);
    }

    return true;
  } catch (error) {
    console.error("Error creating post notifications:", error);
    throw error;
  }
};