import React from "react";
import "./LabelFAIcon.css";

// Label with Font-Awesome icon

function LabelFAIcon({ label, faClass }) {
  return (
    <React.Fragment>
      <span className="task__icon">
        <span className={faClass}></span>
      </span>
      <span className="task__line-label">{label}</span>
    </React.Fragment>
  );
}

export default LabelFAIcon;
