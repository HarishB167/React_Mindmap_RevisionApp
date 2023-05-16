import React from "react";
import "./SideBar.css";

const LabelWithText = ({ labelIconClasses, label, handleClick }) => {
  return (
    <div className="label_with_text" onClick={handleClick}>
      <span className={labelIconClasses}></span>
      <span className="label_with_text__expanded">{label}</span>
    </div>
  );
};

function SideBar(props) {
  return (
    <div className="sidebar">
      <span className="sidebar_user">
        <span className="fa fa-sign-in"></span>
        <span className="sidebar_user__label">Log In</span>
      </span>
      <div className="sidebar_items">
        <LabelWithText
          labelIconClasses="sprite light home"
          label="Home"
          handleClick={() => props.history.push("/")}
        />
        <LabelWithText
          labelIconClasses="sprite light bookmarks"
          label="Add Category"
          handleClick={() => props.history.push("/category-create")}
        />
        <LabelWithText labelIconClasses="fa fa-calendar" label="Calendar" />
        <LabelWithText
          labelIconClasses="fa fa-snowflake-o"
          label="Mindmaps"
          handleClick={() => props.history.push("/mindmap-list")}
        />
        <LabelWithText labelIconClasses="sprite light user" label="Profile" />
        <LabelWithText
          labelIconClasses="sprite light settings"
          label="Settings"
        />
      </div>
    </div>
  );
}

export default SideBar;
