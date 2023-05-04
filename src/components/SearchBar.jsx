import React from "react";
import "./SearchBar.css";

function SearchBar({ placeholder }) {
  return (
    <div className="search_bar search_bar_dark">
      <span className="search_bar__search_icon icon"></span>
      <input type="text" placeholder={placeholder} />
    </div>
  );
}

export default SearchBar;
