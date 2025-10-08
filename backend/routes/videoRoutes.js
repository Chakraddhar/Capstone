// backend/routes/videoRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  uploadVideo,
  getUserVideos,
  deleteVideo,
} from "../controllers/videoController.js";

const router = express.Router();

// Upload video
router.post("/", protect, uploadVideo);

// Get all videos uploaded by current user
router.get("/user", protect, getUserVideos);

// Delete a specific video
router.delete("/:id", protect, deleteVideo);

export default router;
