import React, { useState } from "react";
import { saveCategory } from "../services/categoryService";
import "./CategoryCreate.css";

function CategoryCreate(props) {
  const [category, setCategory] = useState({ id: "", title: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    saveCategory(category);
    props.history.goBack();
  };

  return (
    <React.Fragment>
      <header className="header">
        <span>Create new category</span>
      </header>

      <form action="" className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category-name">Category name:</label>
          <input
            type="text"
            id="category-name"
            placeholder="Category name"
            value={category.title}
            onChange={(e) =>
              setCategory({ ...category, title: e.target.value })
            }
          />
        </div>

        <div className="form-group form-group-btns">
          <button
            className="btn btn-cancel"
            type="reset"
            onClick={() => props.history.goBack()}
          >
            Cancel
          </button>
          <button className="btn btn-submit" type="submit">
            Create Category
          </button>
        </div>
      </form>
    </React.Fragment>
  );
}

export default CategoryCreate;
