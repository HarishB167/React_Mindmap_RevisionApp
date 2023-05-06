import React from "react";
import TaskItem from "./TaskItem";
import "./TaskSet.css";

function TaskSet({ taskHeader, taskItems, onTaskItemClick }) {
  return (
    <div className="task-set">
      <div className="task-set__header task-set--dark">
        {taskHeader}
        <span className="fa fa-chevron-down"></span>
      </div>
      {taskItems.map((item, idx) => (
        <TaskItem
          key={idx}
          title={item.title}
          datetime={item.datetime}
          category={item.category}
          revisionDone={item.revisionDone}
          onClick={() => onTaskItemClick(item.id)}
        />
      ))}
    </div>
  );
}

export default TaskSet;
