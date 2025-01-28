// src/routes/notification.js
import express from 'express';
import { 
    getNotifications, 
    deleteNotification, 
    markNotificationsAsRead, 
    getUnreadNotificationCount,
    handleServiceNotification
} from '../controllers/notification.js';
import { protect, verifyServiceToken } from '../middleware/authentication.js';

const router = express.Router();

// User-facing routes
router.get('/', protect, getNotifications);
router.get('/unread-count', protect, getUnreadNotificationCount);
router.post('/mark-as-read', protect, markNotificationsAsRead);
router.delete('/:id', protect, deleteNotification);

// Service-to-service routes
router.post('/', verifyServiceToken, handleServiceNotification);

export default router;