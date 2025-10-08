// src/components/FilterButtons.jsx
import React from "react";

const categories = [
  "All",
  "Music",
  "Gaming",
  "Live",
  "News",
  "Sports",
  "Movies",
  "Learning",
  "Fashion",
  "Comedy",
  "Technology",
  "Travel",
];

const FilterButtons = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="filter-buttons">
      {categories.map((category, index) => (
        <button
          key={index}
          className={`filter-btn ${selectedCategory === category ? "active" : ""}`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
