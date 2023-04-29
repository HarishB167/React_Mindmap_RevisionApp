import React, { useEffect, useState } from "react";
import "../assets/css/home.css";
import profilePhoto from "../assets/images/profile_photo.png";
import TaskList from "./TaskList";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import MindmapList from "./MindmapList";

function Home(props) {
  const [activePage, setActivePage] = useState("");

  useEffect(() => {
    const path = props.history.location.pathname;
    if (path === "/") setActivePage("index");
    else if (path === "/mindmap-list") setActivePage("mindmapList");
  });

  const handleAdd = () => {
    props.history.push("/create-task");
  };

  return (
    <main className="main">
      <header className="header">
        <span className="header__sort-icon icon"></span>
        <span>Index</span>
        <span className="header__profile-photo">
          <img src={profilePhoto} alt="Profile photo" />
        </span>
      </header>
      <Switch>
        <Route path="/mindmap-list" component={MindmapList} />
        <Route path="/" component={TaskList} />
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
    </main>
  );
}

export default Home;
