// src/routes/notification.js
import express from 'express';
import { 
    getNotifications, 
    deleteNotification, 
    markNotificationsAsRead, 
    getUnreadNotificationCount 
} from '../controllers/notification.js';
import { protect } from '../middleware/authentication.js';

const router = express.Router();

router.route('/').get(protect, getNotifications);
router.route('/unread-count').get(protect, getUnreadNotificationCount);
router.route('/mark-as-read').post(protect, markNotificationsAsRead);
router.route('/:id').delete(protect, deleteNotification);

export default router;