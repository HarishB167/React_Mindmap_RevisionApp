import React from "react";
import { intToRGB, hashCode, getContrastColor } from "../services/utils";

function MindmapItem({ title, createDate, nextRevisionDate, level, onClick }) {
  const bgColor = intToRGB(hashCode(level.repeat(2)));
  return (
    <div className="task-item task-set--dark c_point" onClick={onClick}>
      <span className="task-item__cricle">
        <span className="fa fa-circle-thin"></span>
      </span>
      <div className="task-item__inner">
        <div className="task-item__title">{title}</div>
        <div className="task-item__inner-line">
          <div className="task-item__datetime">{createDate}</div>
          {nextRevisionDate && (
            <div className="task-item__datetime">NR : {nextRevisionDate}</div>
          )}
          {level && (
            <div
              className="task-item__category"
              style={{
                background: bgColor,
                color: getContrastColor(bgColor),
              }}
            >
              {level}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MindmapItem;
