import express from "express";
import { addComment, editComment, deleteComment } from "../controllers/commentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/:videoId", protect, addComment);
router.put("/:id", protect, editComment);
router.delete("/:id", protect, deleteComment);

export default router;
