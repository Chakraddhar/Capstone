import Channel from "../models/Channel.js";
import Video from "../models/Video.js";

// Create channel
export const createChannel = async (req, res) => {
  try {
    const { name, description, profilePic, bannerPic } = req.body;

    // Check if channel already exists
    const existing = await Channel.findOne({ user: req.user._id });
    if (existing) return res.status(400).json({ message: "Channel already exists", channel: existing });

    const newChannel = await Channel.create({
      user: req.user._id,
      name,
      description,
      profilePic,
      bannerPic,
    });

    res.status(201).json(newChannel);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get current user's channel
export const getMyChannel = async (req, res) => {
  try {
    const channel = await Channel.findOne({ user: req.user._id });
    if (!channel) return res.status(404).json({ message: "No channel found" });
    const videos = await Video.find({ channel: channel._id });
    res.json({ channel, videos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get any channel by ID
export const getChannelById = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.channelId);
    if (!channel) return res.status(404).json({ message: "Channel not found" });
    const videos = await Video.find({ channel: channel._id });
    res.json({ channel, videos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
