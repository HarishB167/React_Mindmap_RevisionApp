import React, { useEffect, useRef, useState } from "react";
import "./CategoryChooser.css";

function CategoryItem({ name, iconElement, bgColor, onCategorySelected }) {
  return (
    <div className="category-item c_point" onClick={onCategorySelected}>
      <span className="category-item__icon" style={{ background: bgColor }}>
        {iconElement}
      </span>
      <span className="category-item__label">{name}</span>
    </div>
  );
}

function CategoryChooser({
  onCategorySelected,
  categories,
  history,
  outsideClicked,
  ...rest
}) {
  const ref = useRef();
  const handleOutsideClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      outsideClicked();
    }
  };

  return (
    <div
      className="container_category_chooser"
      {...rest}
      onMouseDown={handleOutsideClick}
    >
      <div className="category-chooser pos-relative" ref={ref}>
        <span className="category-chooser__title">Choose Category</span>
        <hr />
        <div className="category-chooser__itemslist">
          {categories.map((ctg, idx) => (
            <CategoryItem
              key={idx}
              {...ctg}
              onCategorySelected={() => onCategorySelected(ctg.id)}
            />
          ))}
        </div>

        <button
          className="btn-submit c_point"
          onClick={() => history.push("/category-create")}
        >
          Add Category
        </button>
      </div>
    </div>
  );
}

export default CategoryChooser;
