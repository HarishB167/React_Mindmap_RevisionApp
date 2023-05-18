import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingIcon from "../../components/desktop/LoadingIcon";
import LoadingPage from "../../components/LoadingPage";
import DeleteButtonWithModal from "../../components/desktop/DeleteButtonWithModal";
import { getCategories } from "../../services/categoryService";
import {
  deleteMindmap,
  getMindmap,
  saveMindmap,
} from "../../services/mindmapService";
import { getRevisionLevels } from "../../services/revisionService";
import { formatDate } from "../../services/utils";
import "./MindmapViewEditForm.css";

function MindmapViewEditForm(props) {
  const [mindmap, setMindmap] = useState({});
  const [categories, setCategories] = useState([]);
  const [revLevels, setRevLevels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function retrieveMindmap() {
      try {
        const mMap = await getMindmap(props.match.params.id);
        setMindmap(mMap);
      } catch (ex) {
        if (ex.response && ex.response.status === 404)
          props.history.replace("/not-found");
      }
    }
    async function retrieveCategoriesNLevels() {
      const cg = await getCategories();
      const lvls = await getRevisionLevels();
      setCategories(cg.map((item) => ({ value: item.id, name: item.name })));
      setRevLevels(lvls.map((item) => ({ value: item.id, name: item.level })));
    }
    async function loadData() {
      setIsLoading(true);
      await retrieveMindmap();
      await retrieveCategoriesNLevels();
      setIsLoading(false);
    }
    loadData();
  }, []);

  const handleChange = (e) => {
    setMindmap({ ...mindmap, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    await saveMindmap(mindmap);
    setIsSaving(false);
  };

  const handleImageLinkClick = () => {
    props.history.push(
      `/image-view/${mindmap.id}?imageUrl=${encodeURIComponent(
        mindmap.mindmapImageUrl
      )}`
    );
  };

  const handleDelete = async () => {
    setIsLoading(true);
    console.log("Deleting mindmap");
    await deleteMindmap(mindmap);
    toast.warn("Mindmap deleted successfully");
    props.history.replace("/mindmap-list");
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="mindmap_view">
      <div className="mindmap_view_item">
        <label htmlFor="title" className="mindmap_view_label">
          Mindmap Title :
        </label>
        <input
          className="mindmap_view_edit_value"
          type="text"
          name="title"
          id="title"
          value={mindmap.title}
          onChange={handleChange}
        />
      </div>
      <div className="mindmap_view_item">
        <label htmlFor="description" className="mindmap_view_label">
          Mindmap Description :
        </label>
        <input
          className="mindmap_view_edit_value"
          type="text"
          name="description"
          id="description"
          value={mindmap.description}
          onChange={handleChange}
        />
      </div>
      <div className="mindmap_view_item">
        <label htmlFor="mindmapImageUrl" className="mindmap_view_label">
          Image URL :
        </label>
        <input
          className="mindmap_view_edit_value"
          type="text"
          name="mindmapImageUrl"
          id="mindmapImageUrl"
          value={mindmap.mindmapImageUrl}
          onChange={handleChange}
        />
      </div>
      <div className="mindmap_view_item">
        <label htmlFor="mindmapImageUrl" className="mindmap_view_label"></label>
        <button
          className="mindmap_view_open_image"
          onClick={handleImageLinkClick}
        >
          Open Image
        </button>
      </div>
      <div className="mindmap_view_item">
        <label htmlFor="creationDate" className="mindmap_view_label">
          Created :
        </label>
        <input
          className="mindmap_view_edit_value"
          type="date"
          name="creationDate"
          id="creationDate"
          value={formatDate(new Date(mindmap.creationDate))}
          onChange={handleChange}
        />
      </div>
      <div className="mindmap_view_item">
        <label htmlFor="date" className="mindmap_view_label">
          Category :
        </label>
        <select
          className="mindmap_view_edit_value"
          name="category"
          id="category"
          value={mindmap.category}
          onChange={handleChange}
        >
          <option>Select</option>
          {categories.map((item) => (
            <option key={item.value} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mindmap_view_item">
        <label htmlFor="revisionLevelId" className="mindmap_view_label">
          Revision Level :
        </label>
        <select
          className="mindmap_view_edit_value"
          name="revisionLevelId"
          id="revisionLevelId"
          value={mindmap.revisionLevelId}
          onChange={handleChange}
        >
          <option>Select</option>
          {revLevels.map((item) => (
            <option key={item.value} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mindmap_view_item">
        <span className="mindmap_view_label">Revision Count :</span>
        <span className="mindmap_view_read_value">{mindmap.revisionCount}</span>
      </div>
      <div className="mindmap_view_item">
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

export default MindmapViewEditForm;
