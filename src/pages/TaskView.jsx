import React from "react";
import "../assets/css/home.css";
import "../assets/css/categoryCreate.css";
import "../assets/css/categoryChooser.css";
import "../assets/css/taskForm.css";
import "../assets/css/taskView.css";

function TaskView(props) {
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
          <span className="task__title-text">Do Math Homework</span>
          <span className="task__edit-btn">
            <span className="fa fa-pencil-square-o"></span>
          </span>
        </div>
        <div className="task__description">Do chapter 2 to 5 next week</div>
        <div className="task__imagelink">
          https://sample.site.com/url-of-image.png
        </div>
        <div className="task__time">
          <span className="task__icon">
            <span className="fa fa-clock-o"></span>
          </span>
          <span className="task__time-label">Task Created :</span>
          <label for="task-created" className="input-file task__val-picker">
            Today At 16:45
            <input type="file" name="task-created" id="task-created" />
          </label>
        </div>
        <div className="task__category">
          <span className="task__icon">
            <span className="fa fa-tag"></span>
          </span>
          <span className="task__category-label">Task Category :</span>
          <label for="category-icon" className="input-file task__val-picker">
            <span className="task__category-label-icon">
              <span className="fa fa-graduation-cap"></span>
            </span>
            University
            <input type="file" name="category-icon" id="category-icon" />
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

export default TaskView;
