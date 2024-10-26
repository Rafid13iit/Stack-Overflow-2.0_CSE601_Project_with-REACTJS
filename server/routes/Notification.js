import express from 'express';
import auth from '../middlewares/auth.js';
import { 
    getNotifications, 
    markAsRead, 
    markAllAsRead 
} from '../controllers/Notification.js';

const router = express.Router();

router.get('/get', auth, getNotifications);
router.patch('/read/:id', auth, markAsRead);
router.patch('/read-all', auth, markAllAsRead);

export default router;