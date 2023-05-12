import "./SideBar.css";

import React from "react";

const LabelWithText = ({ labelIconClasses, label }) => {
  return (
    <div className="label_with_text">
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
        <LabelWithText labelIconClasses="sprite light home" label="Home" />
        <LabelWithText labelIconClasses="fa fa-calendar" label="Calendar" />
        <LabelWithText labelIconClasses="fa fa-snowflake-o" label="Mindmaps" />
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
