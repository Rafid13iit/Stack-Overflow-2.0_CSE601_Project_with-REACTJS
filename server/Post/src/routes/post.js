// src/routes/post.js
import express from 'express';
import { getPosts, createPost, getPostById } from '../controllers/post.js';
import { protect } from '../middleware/authentication.js';

const router = express.Router();

router.get('/', protect, getPosts);
router.post('/', protect, createPost);
router.get('/:id', protect, getPostById);

export default router;