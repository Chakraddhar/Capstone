import React from "react";
import {
  AiFillHome,
  AiOutlineFire,
  AiOutlineVideoCamera,
  AiOutlineHistory,
  AiOutlineClockCircle,
  AiOutlineLike,
  AiOutlineSetting,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { RiMovieLine } from "react-icons/ri";
import { GiGamepad } from "react-icons/gi";
import { FaYoutube } from "react-icons/fa";
import { IoMdMusicalNotes } from "react-icons/io";

const Sidebar = ({ isOpen }) => {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul className="main-section">
        <li><AiFillHome size={24} /><span>Home</span></li>
        <li><AiOutlineFire size={24} /><span>Trending</span></li>
        <li><AiOutlineVideoCamera size={24} /><span>Subscriptions</span></li>
      </ul>

      <ul className="library-section">
        <li><MdOutlineVideoLibrary size={24} /><span>Library</span></li>
        <li><AiOutlineHistory size={24} /><span>History</span></li>
        <li><AiOutlineClockCircle size={24} /><span>Watch Later</span></li>
        <li><AiOutlineLike size={24} /><span>Liked Videos</span></li>
      </ul>

      <h4 className="more-label">More from YouTube</h4>
      <ul className="more-section">
        <li><FaYoutube size={24} /><span>YouTube Premium</span></li>
        <li><RiMovieLine size={24} /><span>Movies</span></li>
        <li><GiGamepad size={24} /><span>Gaming</span></li>
        <li><IoMdMusicalNotes size={24} /><span>Music</span></li>
      </ul>

      <ul className="settings-section">
        <li><AiOutlineSetting size={24} /><span>Settings</span></li>
        <li><AiOutlineQuestionCircle size={24} /><span>Help</span></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
