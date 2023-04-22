import React, { useEffect, useState } from "react";
import "../assets/css/home.css";
import "../assets/css/categoryCreate.css";
import "../assets/css/categoryChooser.css";
import "../assets/css/taskForm.css";
import "../assets/css/taskView.css";
import { getMindmap } from "../services/mindmapService";
import { formatDate } from "../services/utils";

function MindmapView(props) {
  const [mindmap, setMindmap] = useState({});

  //   category: 2
  // category_name: "Bhagavad_Gita"
  // creation_date: "2023-04-06T06:11:39.705175Z"
  // description: "Vistar"
  // id: 2
  // image_link: "https://to.do"
  // next_revision_date: null
  // revision_count: 0
  // revision_level: "Level 4"
  // title: "Vistar"

  useEffect(() => {
    async function retrieveMindmap() {
      const mMap = await getMindmap(props.match.params.id);
      setMindmap(mMap);
    }
    retrieveMindmap();
  }, []);

  return (
    <main className="main">
      <header className="header">
        <span className="header__cross-icon">
          <span className="fa fa-times"></span>
        </span>
        <span className="header__cross-icon">
          <span className="fa fa-refresh"></span>
        </span>
      </header>

      <div className="task">
        <div className="task__title">
          <span className="task__title-circle">
            <span className="fa fa-circle-o"></span>
          </span>
          <span className="task__title-text">{mindmap.title}</span>
          <span className="task__edit-btn">
            <span className="fa fa-pencil-square-o"></span>
          </span>
        </div>
        <div className="task__description">{mindmap.description}</div>
        <div className="task__imagelink">{mindmap.image_link}</div>
        <div className="task__time">
          <span className="task__icon">
            <span className="fa fa-clock-o"></span>
          </span>
          <span className="task__time-label">Mindmap Created :</span>
          <label htmlFor="task-created" className="input-file task__val-picker">
            {mindmap.creation_date &&
              formatDate(new Date(mindmap.creation_date))}
            <input type="file" name="task-created" id="task-created" />
          </label>
        </div>
        <div className="task__category">
          <span className="task__icon">
            <span className="fa fa-tag"></span>
          </span>
          <span className="task__category-label">Mindmap Category :</span>
          <label
            htmlFor="category-icon"
            className="input-file task__val-picker"
          >
            {mindmap.category_name}
            <input type="file" name="category-icon" id="category-icon" />
          </label>
        </div>
        <div className="task__line">
          <span className="task__icon">
            <span className="fa fa-level-up"></span>
          </span>
          <span className="task__line-label">Mindmap Level :</span>
          <label htmlFor="task-level" className="input-file task__val-picker">
            {mindmap.revision_level}
            <input type="file" name="task-level" id="task-level" />
          </label>
        </div>
        <div className="task__line">
          <span className="task__icon">
            <span className="fa fa-gamepad"></span>
          </span>
          <span className="task__line-label">Revision count :</span>
          <label htmlFor="task-count" className="input-file task__val-picker">
            {mindmap.revision_count}
            <input type="file" name="task-count" id="task-count" />
          </label>
        </div>
        <button className="task__delete-btn">
          <span className="task__icon">
            <span className="fa fa-trash"></span>
          </span>
          Delete Task
        </button>
      </div>

      <button className="btn btn-submit fix-bottom">Edit Task</button>
    </main>
  );
}

export default MindmapView;
