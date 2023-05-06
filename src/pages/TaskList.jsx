import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import TaskSet from "../components/TaskSet";
import { getTasks } from "../services/taskService";
import "./TaskList.css";

function TaskList(props) {
  const [tasks, setTasks] = useState([]);

  async function retrieveRenderTasks() {
    const rs = await getTasks();
    setTasks(rs);
  }

  useEffect(() => {
    retrieveRenderTasks();
  }, []);

  const onTaskItemClick = (id) => {
    props.history.push(`/task-view/${id}`);
  };

  return (
    <React.Fragment>
      <SearchBar placeholder="Search for your task..." />
      <div className="content">
        {tasks.map((item, idx) => (
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
