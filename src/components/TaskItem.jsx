import React from "react";
import { intToRGB, hashCode } from "../services/utils";
import "./TaskItem.css";

function TaskItem({ title, datetime, category, onClick }) {
  return (
    <div className="task-item task-set--dark c_point" onClick={onClick}>
      <span className="task-item__cricle">
        <span className="fa fa-circle-thin"></span>
      </span>
      <div className="task-item__inner">
        <div className="task-item__title">{title}</div>
        <div className="task-item__inner-line">
          <div className="task-item__datetime">{datetime}</div>
          <div
            className="task-item__category"
            style={{ background: intToRGB(hashCode(category)) }}
          >
            {category}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
