import React from "react";
import TaskItem from "./TaskItem";

function TaskSet({ taskHeader, taskItems }) {
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
        />
      ))}
    </div>
  );
}

export default TaskSet;
