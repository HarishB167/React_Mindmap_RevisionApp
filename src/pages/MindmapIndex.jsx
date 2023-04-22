import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import TaskSet from "../components/TaskSet";
import MindmapSet from "../components/MindmapSet";
import { getMindmaps } from "../services/mindmapService";
import "../assets/css/home.css";
import profilePhoto from "../assets/images/profile_photo.png";

function MindmapIndex(props) {
  const [mindmaps, setMindmaps] = useState([]);

  useEffect(() => {
    async function retrieveRenderMindmaps() {
      const rs = await getMindmaps();
      setMindmaps(rs);
    }
    retrieveRenderMindmaps();
  }, []);

  return (
    <main className="main">
      <header className="header">
        <span className="header__sort-icon icon"></span>
        <span>Mindmap : Index</span>
        <span className="header__profile-photo">
          <img src={profilePhoto} alt="Profile photo" />
        </span>
      </header>
      <SearchBar placeholder="Search for your mindmaps..." />
      <div className="content">
        {mindmaps.map((item, idx) => (
          <MindmapSet
            key={idx}
            category={item.mindmapCategory}
            mindmapItems={item.mindmapItems}
            level={item.level}
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
          <span onClick={() => props.history.push("/create-mindmap")}>+</span>
        </div>
        <div className="bottom-nav__item c_point">
          <span className="fa fa-clock-o"></span>Focus
        </div>
        <div className="bottom-nav__item c_point">
          <span className="fa fa-user"></span>Profile
        </div>
      </div>
    </main>
  );
}

export default MindmapIndex;
