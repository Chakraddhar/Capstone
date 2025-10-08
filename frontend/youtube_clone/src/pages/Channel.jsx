// src/pages/Channel.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Channel = () => {
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [editingVideo, setEditingVideo] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch logged-in user's channel
  useEffect(() => {
    const fetchChannel = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/channels/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChannel(res.data.channel);
      } catch (err) {
        console.log(err);
        setChannel(null);
      }
    };

    fetchChannel();
  }, [navigate]);

  // Fetch user’s uploaded videos
  const fetchVideos = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/videos/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVideos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Upload new video
  const handleUpload = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!title || !url) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/videos",
        { title, url },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTitle("");
      setUrl("");
      setError("");
      fetchVideos();
    } catch (err) {
      setError("Error uploading video");
    }
  };

  // Delete video
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/videos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVideos(videos.filter((v) => v._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // Start editing video
  const startEditing = (video) => {
    setEditingVideo(video);
    setTitle(video.title);
    setUrl(video.url);
  };

  // Update video
  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:5000/api/videos/${editingVideo._id}`,
        { title, url },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditingVideo(null);
      setTitle("");
      setUrl("");
      fetchVideos();
    } catch (err) {
      setError("Error updating video");
    }
  };

  if (!channel) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f2f5",
          color: "#333",
        }}
      >
        <h2>You don’t have a channel yet.</h2>
        <button
          onClick={() => navigate("/create-channel")}
          style={{
            padding: "10px 20px",
            marginTop: "20px",
            backgroundColor: "#ff0000",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Create Channel
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
        background: "linear-gradient(180deg, #ffffff, #e6f0ff)",
        color: "#222",
      }}
    >
      {/* Channel Info */}
      <img
        src={
          channel.profilePic ||
          "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
        }
        alt="Channel Avatar"
        style={{
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: "20px",
          border: "3px solid #ff0000",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      />
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "10px" }}>
        {channel.name}
      </h1>
      <p
        style={{
          fontSize: "1.1rem",
          textAlign: "center",
          maxWidth: "600px",
          color: "#555",
          marginBottom: "40px",
        }}
      >
        {channel.description}
      </p>

      {/* Upload or Edit Form */}
      <div
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          width: "90%",
          maxWidth: "600px",
          marginBottom: "40px",
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>
          {editingVideo ? "Edit Video" : "Upload a New Video"}
        </h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form
          onSubmit={editingVideo ? handleUpdate : handleUpload}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <input
            type="text"
            placeholder="Video Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="text"
            placeholder="YouTube Video URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: "10px",
                backgroundColor: "#ff0000",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {editingVideo ? "Update Video" : "Upload"}
            </button>
            {editingVideo && (
              <button
                type="button"
                onClick={() => {
                  setEditingVideo(null);
                  setTitle("");
                  setUrl("");
                }}
                style={{
                  flex: 1,
                  padding: "10px",
                  backgroundColor: "#ccc",
                  color: "#000",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Video List */}
      <div style={{ width: "100%", maxWidth: "800px" }}>
        <h2 style={{ marginBottom: "20px" }}>Your Uploaded Videos</h2>
        {videos.length === 0 ? (
          <p>No videos uploaded yet.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {videos.map((video) => (
              <div
                key={video._id}
                style={{
                  background: "#fff",
                  borderRadius: "10px",
                  padding: "15px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  textAlign: "center",
                }}
              >
                <iframe
                  width="100%"
                  height="150"
                  src={video.url.replace("watch?v=", "embed/")}
                  title={video.title}
                  allowFullScreen
                  style={{ borderRadius: "10px" }}
                ></iframe>
                <h4 style={{ margin: "10px 0" }}>{video.title}</h4>
                <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                  <button
                    onClick={() => startEditing(video)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(video._id)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#ff0000",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Channel;
