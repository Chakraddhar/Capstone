import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateChannel = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [existingChannel, setExistingChannel] = useState(null);

  // Check if user already has a channel
  useEffect(() => {
    const fetchChannel = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:5000/api/channels/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.channel) {
          setExistingChannel(res.data.channel);
          navigate("/channel"); // Redirect to channel if already exists
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchChannel();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name) {
      setError("Channel name is required");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to create a channel");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/channels",
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.channel) {
        navigate("/channel"); // Redirect to channel page after creation
      }
    } catch (err) {
      if (err.response?.data?.message === "Channel already exists") {
        navigate("/channel"); // Redirect if channel exists
      } else {
        setError("Error creating channel");
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212",
        color: "white",
      }}
    >
      <h1>Create Your Channel</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}
      >
        <input
          type="text"
          placeholder="Channel Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "10px" }}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: "10px" }}
        />
        <button
          type="submit"
          style={{ padding: "10px", backgroundColor: "yellow", border: "none", cursor: "pointer" }}
        >
          Create Channel
        </button>
      </form>
    </div>
  );
};

export default CreateChannel;
