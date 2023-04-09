import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import TaskSet from "../components/TaskSet";
import { getTasks } from "../services/taskService";
import "../assets/css/home.css";
import profilePhoto from "../assets/images/profile_photo.png";

function Home(props) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function retrieveTasks() {
      const rs = await getTasks();
      console.log("rs :>> ", rs);
      setTasks(rs);
    }
    retrieveTasks();
  }, []);

  const taskSets = [
    {
      taskHeader: "Today",
      taskItems: [
        {
          title: "Do Math Homework",
          datetime: "Today at 16:45",
          category: "University",
        },
        {
          title: "Take out dogs",
          datetime: "Today at 16:45",
          category: "University",
        },
        {
          title: "Business meeting",
          datetime: "Today at 16:45",
          category: "University",
        },
      ],
    },
    {
      taskHeader: "Completed",
      taskItems: [
        {
          title: "Buy Grocery",
          datetime: "Today at 16:45",
          category: "University",
        },
      ],
    },
  ];

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
        {taskSets.map((item, idx) => (
          <TaskSet
            key={idx}
            taskHeader={item.taskHeader}
            taskItems={item.taskItems}
          />
        ))}
      </div>
      <div className="bottom-nav">
        <div className="bottom-nav__item">
          <span className="fa fa-home"></span>Index
        </div>
        <div className="bottom-nav__item">
          <span className="fa fa-calendar"></span>Calendar
        </div>
        <div className="bottom-nav__add-btn">
          <span>+</span>
        </div>
        <div className="bottom-nav__item">
          <span className="fa fa-clock-o"></span>Focus
        </div>
        <div className="bottom-nav__item">
          <span className="fa fa-user"></span>Profile
        </div>
      </div>
    </main>
  );
}

export default Home;
