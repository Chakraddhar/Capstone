// backend/controllers/videoController.js
import Video from "../models/Video.js";

// Upload a new video
export const uploadVideo = async (req, res) => {
  try {
    const { title, url } = req.body;

    if (!title || !url) {
      return res.status(400).json({ message: "Title and URL are required" });
    }

    const newVideo = await Video.create({
      user: req.user._id,
      title,
      url,
    });

    res.status(201).json(newVideo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error uploading video" });
  }
};

// Get all videos of logged-in user
export const getUserVideos = async (req, res) => {
  try {
    const videos = await Video.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching user videos" });
  }
};

// Delete a video by ID
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Only allow the owner to delete their video
    if (video.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this video" });
    }

    await video.deleteOne();
    res.json({ message: "Video deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting video" });
  }
};
