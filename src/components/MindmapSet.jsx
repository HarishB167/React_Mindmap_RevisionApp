import React from "react";
import MindmapItem from "./MindmapItem";
import "./MindmapSet.css";

function MindmapSet({ category, mindmapItems, onMindmapItemClick }) {
  return (
    <div className="task-set">
      <div className="task-set__header task-set--dark">
        {category}
        <span className="fa fa-chevron-down"></span>
      </div>
      {mindmapItems.map((item, idx) => (
        <MindmapItem
          key={idx}
          title={item.title}
          createDate={item.createDate}
          nextRevisionDate={item.nextRevision}
          level={item.level}
          onClick={() => onMindmapItemClick(item.id)}
        />
      ))}
    </div>
  );
}

export default MindmapSet;
