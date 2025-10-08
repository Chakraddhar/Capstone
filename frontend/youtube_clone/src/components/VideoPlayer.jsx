// src/components/VideoPlayer.jsx
import React, { useState, useEffect } from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

const VideoPlayer = ({ video, onBack }) => {
  const [likes, setLikes] = useState(120);
  const [dislikes, setDislikes] = useState(5);
  const [comments, setComments] = useState([
    { id: 1, text: "Great video!" },
    { id: 2, text: "Very helpful!" },
  ]);
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };

  const requireLogin = () => {
    alert("Please sign in to perform this action.");
  };

  const handleAddComment = () => {
    if (!isLoggedIn()) return requireLogin();
    if (!newComment.trim()) return;
    setComments([...comments, { id: Date.now(), text: newComment }]);
    setNewComment("");
  };

  const handleDeleteComment = (id) => {
    if (!isLoggedIn()) return requireLogin();
    setComments(comments.filter((c) => c.id !== id));
  };

  const handleEditComment = (id) => {
    if (!isLoggedIn()) return requireLogin();
    const comment = comments.find((c) => c.id === id);
    setEditingId(id);
    setEditText(comment.text);
  };

  const handleSaveEdit = () => {
    if (!isLoggedIn()) return requireLogin();
    setComments(
      comments.map((c) =>
        c.id === editingId ? { ...c, text: editText } : c
      )
    );
    setEditingId(null);
    setEditText("");
  };

  const handleLike = () => {
    if (!isLoggedIn()) return requireLogin();
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    if (!isLoggedIn()) return requireLogin();
    setDislikes(dislikes + 1);
  };

  return (
    <div className="video-player-page">
      {/*<button onClick={onBack} style={{ marginBottom: "10px" }}>← Back to videos</button>*/}

      <div className="video-container">
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${video.thumbnail.split("/vi/")[1].split("/")[0]}`}
          title={video.title}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>

      <h2>{video.title}</h2>
      <p>{video.views} • {video.time}</p>
      <p>Channel: {video.channel}</p>

      <div style={{ margin: "10px 0" }}>
        <button onClick={handleLike}>👍 {likes}</button>
        <button onClick={handleDislike} style={{ marginLeft: "10px" }}>👎 {dislikes}</button>
      </div>

      <div className="comments">
        <h3>Comments ({comments.length})</h3>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            value={newComment}
            placeholder="Add a comment..."
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment} style={{ marginLeft: "5px" }}>Post</button>
        </div>

        {comments.map((c) => (
          <div key={c.id} style={{ marginBottom: "8px" }}>
            {editingId === c.id ? (
              <>
                <input value={editText} onChange={(e) => setEditText(e.target.value)} />
                <button onClick={handleSaveEdit} style={{ marginLeft: "5px" }}>Save</button>
              </>
            ) : (
              <>
                {c.text}
                <button onClick={() => handleEditComment(c.id)} style={{ marginLeft: "10px" }}>Edit</button>
                <button onClick={() => handleDeleteComment(c.id)} style={{ marginLeft: "5px", color: "red" }}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;
