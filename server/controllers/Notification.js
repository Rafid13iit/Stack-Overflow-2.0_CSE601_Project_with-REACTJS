import Notification from '../models/Notification.js';
import mongoose from 'mongoose';

// Create a new notification
export const createNotification = async (data) => {
    try {
        const notification = new Notification(data);
        await notification.save();
        return notification;
    } catch (error) {
        console.error('Error creating notification:', error);
        return null;
    }
};

// Get notifications for a user
export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ 
            recipientId: req.userId 
        })
        .sort({ createdAt: -1 })
        .limit(50);
        
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mark notification as read
export const markAsRead = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('Notification unavailable...');
    }

    try {
        const notification = await Notification.findOneAndUpdate(
            { _id, recipientId: req.userId },
            { $set: { isRead: true } },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mark all notifications as read
export const markAllAsRead = async (req, res) => {
    try {
        await Notification.updateMany(
            { recipientId: req.userId, isRead: false },
            { $set: { isRead: true } }
        );
        
        res.status(200).json({ message: "All notifications marked as read" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete old notifications (cleanup job)
export const cleanupNotifications = async () => {
    try {
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        await Notification.deleteMany({ createdAt: { $lt: thirtyDaysAgo } });
    } catch (error) {
        console.error('Notification cleanup failed:', error);
    }
};