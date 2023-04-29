import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import TaskSet from "../components/TaskSet";
import { getTasks } from "../services/taskService";

function TaskList(props) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function retrieveRenderTasks() {
      const rs = await getTasks();
      setTasks(rs);
    }
    retrieveRenderTasks();
  }, []);

  return (
    <React.Fragment>
      <SearchBar placeholder="Search for your task..." />
      <div className="content">
        {tasks.map((item, idx) => (
          <TaskSet
            key={idx}
            taskHeader={item.taskHeader}
            taskItems={item.taskItems}
          />
        ))}
      </div>
    </React.Fragment>
  );
}

export default TaskList;
