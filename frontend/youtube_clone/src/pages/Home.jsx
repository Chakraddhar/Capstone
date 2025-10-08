// src/pages/Home.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import FilterButtons from "../components/FilterButtons";
import VideoCard from "../components/VideoCard";
import { videos } from "../data/videos";
import VideoPlayer from "../components/VideoPlayer";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // 🔹 New states for search & filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // 🔹 Filter logic (search + category)
  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} onSearch={setSearchQuery} onLogoClick={() => setSelectedVideo(null)}/>
      <div className="home-layout">
        <Sidebar isOpen={sidebarOpen} />

        <main className={sidebarOpen ? "main-with-sidebar" : "main-full"}>
          {selectedVideo ? (
            <VideoPlayer
              video={selectedVideo}
              onBack={() => setSelectedVideo(null)}
            />
          ) : (
            <>
              <FilterButtons
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
              <div className="video-grid">
                {filteredVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onClick={() => setSelectedVideo(video)}
                  />
                ))}
                {filteredVideos.length === 0 && (
                  <p style={{ textAlign: "center", marginTop: "20px" }}>
                    No videos found.
                  </p>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
