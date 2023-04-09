import React from "react";
import "../assets/css/home.css";
import "../assets/css/categoryCreate.css";
import "../assets/css/categoryChooser.css";

function CategoryItem({ name, iconElement, bgColor }) {
  return (
    <div className="category-item">
      <span className="category-item__icon" style={{ background: bgColor }}>
        {iconElement}
      </span>
      <span className="category-item__label">{name}</span>
    </div>
  );
}

function CategoryChooser(props) {
  const categories = [
    {
      name: "Grocery",
      iconElement: <span className="fa fa-shopping-basket"></span>,
      bgColor: "#CCFF80",
    },
    {
      name: "Work",
      iconElement: <span className="fa fa-briefcase"></span>,
      bgColor: "#FF9680",
    },
    {
      name: "Sport",
      iconElement: <span>S</span>,
      bgColor: "#80FFFF",
    },
    {
      name: "Design",
      iconElement: <span className="fa fa-th"></span>,
      bgColor: "#80FFD9",
    },
    {
      name: "University",
      iconElement: <span className="fa fa-graduation-cap"></span>,
      bgColor: "#809CFF",
    },
    {
      name: "Social",
      iconElement: <span className="fa fa-bullhorn"></span>,
      bgColor: "#FF80EB",
    },
    {
      name: "Music",
      iconElement: <span className="fa fa-music"></span>,
      bgColor: "#FC80FF",
    },
    {
      name: "Health",
      iconElement: <span className="fa fa-heartbeat"></span>,
      bgColor: "#80FFA3",
    },
    {
      name: "Movie",
      iconElement: <span className="fa fa-video-camera"></span>,
      bgColor: "#80D1FF",
    },
    {
      name: "Home",
      iconElement: <span className="fa fa-home"></span>,
      bgColor: "#FFCC80",
    },
    {
      name: "Create new",
      iconElement: <span className="fa fa-plus"></span>,
      bgColor: "#80FFD1",
    },
  ];

  return (
    <main className="main main--center">
      <div className="category-chooser pos-relative">
        <span className="category-chooser__title">Choose Category</span>
        <hr />
        <div className="category-chooser__itemslist">
          {categories.map((ctg, idx) => (
            <CategoryItem {...ctg} />
          ))}
        </div>

        <button className="btn-submit">Add Category</button>
      </div>
    </main>
  );
}

export default CategoryChooser;
