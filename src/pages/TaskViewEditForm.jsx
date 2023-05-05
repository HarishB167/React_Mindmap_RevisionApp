import React, { useEffect, useState } from "react";
// import "../assets/css/home.css";
// import "../assets/css/categoryCreate.css";
// import "../assets/css/categoryChooser.css";
// import "../assets/css/taskForm.css";
// import "../assets/css/taskView.css";
import "./TaskViewEditForm.css";
import { getTask, saveRevisionItemForMindmap } from "../services/taskService";
import LabelFAIcon from "../components/common/viewEditPage/LabelFAIcon";
import InputDate from "../components/common/viewEditPage/InputDate";
import LoadingPage from "../components/LoadingPage";

function TaskViewEditForm(props) {
  const [editMode, setEditMode] = useState(false);
  const [task, setTask] = useState({});

  useEffect(() => {
    async function retrieveTask() {
      const tk = await getTask(props.match.params.id);
      console.log("tk :>> ", tk);
      setTask(tk);
    }
    retrieveTask();
  }, []);

  const handleDateChange = (e) => {
    const date = e.target.value;
    if (date)
      setTask({
        ...task,
        date: new Date(date).toISOString(),
      });
  };

  const handleImageLinkClick = () => {
    props.history.push(
      `/image-view/${task.mindmap_id}?imageUrl=${encodeURIComponent(
        task.mindmap_url
      )}`
    );
  };

  const handleSave = () => {
    console.log("task :>> ", task);
    saveRevisionItemForMindmap(task.mindmap_id, task);
    setEditMode(!editMode);
  };

  if (Object.keys(task).length === 0) {
    return <LoadingPage />;
  }

  return (
    <main className="main">
      <header className="header">
        <span className="header__icon" onClick={() => props.history.goBack()}>
          <span className="fa fa-times"></span>
        </span>
        <span className="header__icon">
          <span className="fa fa-refresh"></span>
        </span>
      </header>

      <div className="task">
        <div className="task__title">
          <span className="task__title-circle">
            <span className="fa fa-circle-o"></span>
          </span>
          <span className="task__title-text">{task.mindmap_title}</span>
          <span
            className="task__edit-btn"
            onClick={() => setEditMode(!editMode)}
          >
            <span className="fa fa-pencil-square-o"></span>
          </span>
        </div>
        <div className="task__description">{task.mindmap_category}</div>
        <div className="task__imagelink" onClick={handleImageLinkClick}>
          {task.mindmap_url}
        </div>
        <div className="task__line">
          <LabelFAIcon faClass="fa fa-clock-o" label="Task Created :" />
          <InputDate
            date={task.date}
            onDateChange={handleDateChange}
            name="task-date"
            disabled={!editMode}
          />
        </div>
        <div className="task__line">
          <LabelFAIcon faClass="fa fa-gamepad" label="Task Done :" />
          <input
            type="checkbox"
            name="category-icon"
            id="category-icon"
            checked={task.revision_done}
            onChange={() =>
              setTask({ ...task, revision_done: !task.revision_done })
            }
            disabled={!editMode}
          />
        </div>
        <button className="task__delete-btn">
          <LabelFAIcon faClass="fa fa-trash" label="Delete Task" />
        </button>
      </div>

      {editMode && (
        <button onClick={handleSave} className="btn-submit fix-bottom">
          Edit Task
        </button>
      )}
    </main>
  );
}

export default TaskViewEditForm;
