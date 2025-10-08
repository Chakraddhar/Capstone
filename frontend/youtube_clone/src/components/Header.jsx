// components/Header.jsx
import React, { useState, useEffect } from "react";
import {
  AiFillYoutube,
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineAudio,
  AiOutlineUser,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = ({ toggleSidebar, onSearch, onLogoClick }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const fetchChannel = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:5000/api/channels/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.channel) setChannel(res.data.channel);
      } catch (err) {
        setChannel(null);
      }
    };

    fetchChannel();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <header className="header">
      {/* Left section */}
      <div className="header-left">
        <AiOutlineMenu size={28} className="menu-icon" onClick={toggleSidebar} />
        <AiFillYoutube size={36} color="red" style={{ cursor: "pointer" }}
  onClick={() => {
    if (onLogoClick) onLogoClick(); // Reset selected video
    navigate("/");
  }}/>
      </div>

      {/* Center search */}
      <div className="header-center">
        <form className="search-bar-container" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search"
            className="search-bar"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              onSearch(e.target.value);
            }}
          />
          <button className="search-button" type="submit">
            <AiOutlineSearch size={22} />
          </button>
        </form>
        <button className="mic-button">
          <AiOutlineAudio size={24} />
        </button>
      </div>

      {/* Right section */}
      <div className="header-right">
        <AiOutlineUser size={28} />
        {user ? (
          <>
            {channel ? (
              <button onClick={() => navigate("/channel")} style={{ marginRight: "10px" }}>
                {channel.name} {/* Show actual channel name */}
              </button>
            ) : (
              <button onClick={() => navigate("/create-channel")} style={{ marginRight: "10px" }}>
                Create Channel
              </button>
            )}
            <img
        src={user.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
        alt="avatar"
        style={{
          width: "35px",
          height: "35px",
          borderRadius: "50%",
          marginLeft: "8px",
          objectFit: "cover",
        }}
      />
            <span style={{ marginLeft: "8px", fontWeight: "bold" }}>{user.username}</span>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setUser(null);
                navigate("/");
              }}
              style={{ marginLeft: "10px" }}
            >
              Logout
            </button>
          </>
        ) : (
          <button onClick={() => navigate("/signin")}>Sign In</button>
        )}
      </div>
    </header>
  );
};

export default Header;
