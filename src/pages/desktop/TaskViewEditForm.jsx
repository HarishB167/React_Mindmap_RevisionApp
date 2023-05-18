import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingIcon from "../../components/desktop/LoadingIcon";
import LoadingPage from "../../components/LoadingPage";
import DeleteButtonWithModal from "../../components/desktop/DeleteButtonWithModal";
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
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function retrieveTask() {
      try {
        setIsLoading(true);
        const tk = await getTask(props.match.params.id);
        console.log("tk :>> ", tk);
        setTask(tk);
        setIsLoading(false);
      } catch (ex) {
        setIsLoading(false);
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
    setIsLoading(true);
    await deleteRevisionItemForMindmap(task.mindmap_id, task);
    toast.warn("Task deleted successfully");
    props.history.replace("/");
    setIsLoading(false);
  };

  if (isLoading) {
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
        <label htmlFor="mindmapImageUrl" className="task_view_label"></label>
        <button className="task_view_open_image" onClick={handleImageLinkClick}>
          Open Image
        </button>
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
        <DeleteButtonWithModal
          className="task_view_delete_btn"
          onClick={handleDelete}
        >
          Delete Task
        </DeleteButtonWithModal>
        <LoadingIcon isLoading={isSaving} />
      </div>
    </div>
  );
}

export default TaskViewEditForm;
