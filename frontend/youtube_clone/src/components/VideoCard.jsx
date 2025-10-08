// src/components/VideoCard.jsx
import React from "react";

const VideoCard = ({ video, onClick }) => {
  return (
    <div className="video-card" onClick={onClick} style={{ cursor: "pointer" }}>
      <div className="thumbnail-wrapper">
        <img src={video.thumbnail} alt={video.title} className="thumbnail" />
      </div>
      <div className="video-info">
        <img src={video.channelAvatar} alt={video.channel} className="channel-avatar" />
        <div>
          <h4>{video.title}</h4>
          <p>{video.channel}</p>
          <p>{video.views} • {video.time}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
