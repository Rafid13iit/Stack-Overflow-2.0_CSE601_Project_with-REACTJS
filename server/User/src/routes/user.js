// src/routes/user.js
import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.js";
import { protect } from "../middleware/authentication.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", loginUser);
router.post("/logout", logoutUser);
router.route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;