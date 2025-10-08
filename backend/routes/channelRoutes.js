import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createChannel, getMyChannel, getChannelById } from "../controllers/channelController.js";

const router = express.Router();

router.post("/", protect, createChannel);
router.get("/me", protect, getMyChannel);
router.get("/:channelId", getChannelById);

export default router;
