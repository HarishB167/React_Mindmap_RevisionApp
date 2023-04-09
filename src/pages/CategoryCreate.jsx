import React from "react";
import ColorChooser from "../components/ColorChooser";
import "../assets/css/home.css";
import "../assets/css/categoryCreate.css";

function CategoryCreate(props) {
  const colors = [
    "#C9CC41",
    "#66CC41",
    "red",
    "yellow",
    "orange",
    "dodgerblue",
    "deeppink",
    "firebrick",
  ];

  return (
    <main className="main">
      <header className="header">
        <span>Create new category</span>
      </header>

      <form action="" className="form">
        <div className="form-group">
          <label for="category-name">Category name:</label>
          <input type="text" id="category-name" placeholder="Category name" />
        </div>

        <div className="form-group">
          <label>Category icon:</label>
          <label for="category-icon" className="input-file">
            Choose icon from library
            <input type="file" name="category-icon" id="category-icon" />
          </label>
        </div>

        <div className="form-group">
          <ColorChooser
            label="Category color"
            name="category-color"
            colorList={colors}
          />
        </div>

        <div className="form-group form-group-btns">
          <button className="btn btn-cancel" type="reset">
            Cancel
          </button>
          <button className="btn btn-submit" type="submit">
            Create Category
          </button>
        </div>
      </form>
    </main>
  );
}

export default CategoryCreate;
