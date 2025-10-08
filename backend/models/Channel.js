import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one channel per user
    },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    profilePic: { type: String, default: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png" },
    bannerPic: { type: String, default: "https://www.gstatic.com/youtube/img/channels/yt_banner_background_v2.jpg" },
  },
  { timestamps: true }
);

export default mongoose.model("Channel", channelSchema);
