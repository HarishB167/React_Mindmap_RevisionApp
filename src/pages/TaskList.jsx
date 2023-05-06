import React, { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import TaskSet from "../components/TaskSet";
import "./TaskList.css";

function TaskList(props) {
  useEffect(() => {
    props.onLoad();
  }, []);

  const onTaskItemClick = (id) => {
    props.history.push(`/task-view/${id}`);
  };

  return (
    <React.Fragment>
      <SearchBar placeholder="Search for your task..." />
      <div className="content">
        {props.tasks.map((item, idx) => (
          <TaskSet
            key={idx}
            taskHeader={item.taskHeader}
            taskItems={item.taskItems}
            onTaskItemClick={onTaskItemClick}
          />
        ))}
      </div>
    </React.Fragment>
  );
}

export default TaskList;
