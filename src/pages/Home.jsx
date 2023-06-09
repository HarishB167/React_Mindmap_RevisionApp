import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import TaskList from "./TaskList";
import MindmapList from "./MindmapList";
import { getTasks } from "../services/taskService";
import { getMindmaps } from "../services/mindmapService";
import profilePhoto from "../assets/images/profile_photo.png";
import "./Home.css";

function Home(props) {
  const [activePage, setActivePage] = useState("");
  const [data, setData] = useState({
    tasks: [],
    mindmaps: [],
    taskRetrieveProcessOn: false,
    mindmapsRetrieveProcessOn: false,
  });

  async function retrieveRenderTasks() {
    setData({ ...data, taskRetrieveProcessOn: true });
    const ts = await getTasks();
    setData({ ...data, tasks: ts, taskRetrieveProcessOn: false });
  }

  async function retrieveRenderMindmaps() {
    setData({ ...data, mindmapsRetrieveProcessOn: true });
    const mMap = await getMindmaps();
    setData({ ...data, mindmaps: mMap, mindmapsRetrieveProcessOn: false });
  }

  useEffect(() => {
    const path = props.history.location.pathname;
    if (path === "/") setActivePage("index");
    else if (path === "/mindmap-list") setActivePage("mindmapList");
  });

  const handleAdd = () => {
    props.history.push("/create-task");
  };

  return (
    <React.Fragment>
      <header className="header">
        <span className="header__sort-icon icon c_point"></span>
        <span>Index</span>
        <span className="header__profile-photo c_point">
          {/* <img src={profilePhoto} alt="Profile photo" /> */}
          <span className="fa fa-sign-in"></span>
        </span>
      </header>
      <Switch>
        <Route
          path="/mindmap-list"
          render={(props) => (
            <MindmapList
              onLoad={retrieveRenderMindmaps}
              mindmaps={data.mindmaps}
              isLoading={data.mindmapsRetrieveProcessOn}
              {...props}
            />
          )}
        />
        <Route
          path="/"
          render={(props) => (
            <TaskList
              onLoad={retrieveRenderTasks}
              tasks={data.tasks}
              isLoading={data.taskRetrieveProcessOn}
              {...props}
            />
          )}
        />
      </Switch>
      <div className="bottom-nav">
        <div
          className="bottom-nav__item c_point"
          onClick={() => activePage !== "index" && props.history.push("/")}
          style={{ color: activePage === "index" ? "red" : "inherit" }}
        >
          <span className="fa fa-home"></span>Index
        </div>
        <div className="bottom-nav__item c_point">
          <span className="fa fa-calendar"></span>Calendar
        </div>
        <div className="bottom-nav__add-btn c_point">
          <span onClick={handleAdd}>+</span>
        </div>
        <div
          className="bottom-nav__item c_point"
          onClick={() =>
            activePage !== "mindmapList" && props.history.push("/mindmap-list")
          }
          style={{ color: activePage === "mindmapList" ? "red" : "inherit" }}
        >
          <span className="fa fa-snowflake-o"></span>
          Mindmap
        </div>
        <div className="bottom-nav__item c_point">
          <span className="fa fa-user"></span>Profile
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
