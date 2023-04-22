import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import TaskSet from "../components/TaskSet";
import { getTasks } from "../services/taskService";
import "../assets/css/home.css";
import profilePhoto from "../assets/images/profile_photo.png";

function Home(props) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function retrieveRenderTasks() {
      const rs = await getTasks();
      setTasks(rs);
    }
    retrieveRenderTasks();
  }, []);

  return (
    <main className="main">
      <header className="header">
        <span className="header__sort-icon icon"></span>
        <span>Index</span>
        <span className="header__profile-photo">
          <img src={profilePhoto} alt="Profile photo" />
        </span>
      </header>
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
      <div className="bottom-nav">
        <div className="bottom-nav__item c_point">
          <span className="fa fa-home"></span>Index
        </div>
        <div className="bottom-nav__item c_point">
          <span className="fa fa-calendar"></span>Calendar
        </div>
        <div className="bottom-nav__add-btn c_point">
          <span onClick={() => props.history.push("/create-task")}>+</span>
        </div>
        <div
          className="bottom-nav__item c_point"
          onClick={() => props.history.push("/mindmap-list")}
        >
          <span className="fa fa-clock-o"></span>
          Focus
        </div>
        <div className="bottom-nav__item c_point">
          <span className="fa fa-user"></span>Profile
        </div>
      </div>
    </main>
  );
}

export default Home;
