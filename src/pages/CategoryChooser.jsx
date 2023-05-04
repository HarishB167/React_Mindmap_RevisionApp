import React, { useEffect, useState } from "react";
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

function CategoryChooser({ onCategorySelected, categories, ...rest }) {
  return (
    <main className="main main--center" {...rest}>
      <div className="category-chooser pos-relative">
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

        <button className="btn-submit c_point">Add Category</button>
      </div>
    </main>
  );
}

export default CategoryChooser;
