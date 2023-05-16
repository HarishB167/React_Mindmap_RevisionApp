import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingIcon from "../../components/desktop/LoadingIcon";
import LoadingPage from "../../components/LoadingPage";
import {
  deleteRevisionItemForMindmap,
  getTask,
  saveRevisionItemForMindmap,
} from "../../services/taskService";
import { formatDate } from "../../services/utils";
import "./TaskViewEditForm.css";

function TaskViewEditForm(props) {
  const [editMode, setEditMode] = useState(false);
  const [task, setTask] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function retrieveTask() {
      try {
        const tk = await getTask(props.match.params.id);
        console.log("tk :>> ", tk);
        setTask(tk);
      } catch (ex) {
        if (ex.response && ex.response.status === 404)
          props.history.replace("/not-found");
      }
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

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    await saveRevisionItemForMindmap(task.mindmap_id, task);
    setIsSaving(false);
    setEditMode(!editMode);
  };

  const handleDelete = async () => {
    await deleteRevisionItemForMindmap(task.mindmap_id, task);
    toast.warn("Task deleted successfully");
    props.history.replace("/");
  };

  if (Object.keys(task).length === 0) {
    return <LoadingPage />;
  }
  return (
    <div className="task_view">
      <div className="task_view_item">
        <span className="task_view_label">Title :</span>
        <span className="task_view_read_value">{task.mindmap_title}</span>
      </div>
      <div className="task_view_item">
        <span className="task_view_label">Category :</span>
        <span className="task_view_read_value">{task.mindmap_category}</span>
      </div>
      <div className="task_view_item">
        <span className="task_view_label">Image URL :</span>
        <span className="task_view_read_value">{task.mindmap_url}</span>
      </div>
      <div className="task_view_item">
        <label htmlFor="date" className="task_view_label">
          Revision Date :
        </label>
        <input
          className="task_view_edit_value"
          type="date"
          name="date"
          id="date"
          value={formatDate(new Date(task.date))}
          onChange={handleChange}
        />
      </div>
      <div className="task_view_item">
        <label htmlFor="revision_done" className="task_view_label">
          Revision Done :
        </label>
        <input
          className="task_view_edit_value"
          type="checkbox"
          name="revision_done"
          id="revision_done"
          checked={task.revision_done}
          onChange={() =>
            setTask({ ...task, revision_done: !task.revision_done })
          }
        />
      </div>
      <div className="task_view_item">
        <button
          className="submit"
          type="submit"
          disabled={isSaving}
          onClick={handleSave}
        >
          Save
        </button>
        <LoadingIcon isLoading={isSaving} />
      </div>
    </div>
  );
}

export default TaskViewEditForm;
