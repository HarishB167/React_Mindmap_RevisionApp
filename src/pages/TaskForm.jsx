import React from "react";
import "../assets/css/home.css";
import "../assets/css/categoryCreate.css";
import "../assets/css/categoryChooser.css";
import "../assets/css/taskForm.css";

function TaskForm(props) {
  return (
    <main className="main main--center">
      <div className="modal-box">
        <form action="" className="form">
          <div className="form-group">
            <label for="task-title" className="form__title">
              Add Task
            </label>
            <input
              id="task-title"
              name="task-title"
              type="text"
              placeholder="Title"
              required
            />
            <input
              id="task-description"
              name="task-description"
              type="text"
              placeholder="Description"
              required
            />
            <input
              id="task-mindmap-image-url"
              name="task-mindmap-image-url"
              type="text"
              placeholder="Image url"
              required
            />
          </div>
          <div className="form__options">
            <span className="fa fa-tag"></span>
            <span className="form__sendbtn">
              <span className="fa fa-angle-double-right"></span>
            </span>
          </div>
        </form>
      </div>
    </main>
  );
}

export default TaskForm;
