import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import InputDate from "../components/common/viewEditPage/InputDate";
import InputSelect from "../components/common/viewEditPage/InputSelect";
import InputText from "../components/common/viewEditPage/InputText";
import LabelFAIcon from "../components/common/viewEditPage/LabelFAIcon";
import LoadingPage from "../components/LoadingPage";
import DeleteButtonWithModal from "../components/common/DeleteButtonWithModal";
import {
  deleteMindmap,
  getMindmap,
  saveMindmap,
} from "../services/mindmapService";
import { getCategories } from "../services/categoryService";
import { getRevisionLevels } from "../services/revisionService";
import "./MindmapViewEditForm.css";

function MindmapViewEditForm(props) {
  const [mindmap, setMindmap] = useState({});
  const [categories, setCategories] = useState([]);
  const [revLevels, setRevLevels] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    async function retrieveMindmap() {
      const mMap = await getMindmap(props.match.params.id);
      setMindmap(mMap);
    }
    retrieveMindmap();
    async function retrieveCategoriesNLevels() {
      const cg = await getCategories();
      const lvls = await getRevisionLevels();
      setCategories(cg.map((item) => ({ value: item.id, name: item.name })));
      setRevLevels(lvls.map((item) => ({ value: item.id, name: item.level })));
    }
    retrieveCategoriesNLevels();
  }, []);

  const handleDateChange = (e) => {
    const date = e.target.value;
    if (date)
      setMindmap({
        ...mindmap,
        creationDate: new Date(date).toISOString(),
      });
  };

  const getRevisionLevelIdFor = (level_name) => {
    const levelObj = revLevels.find((item) => item.name === level_name);
    if (levelObj) return levelObj.value;
    return level_name;
  };

  const handleImageLinkClick = () => {
    if (!editMode)
      props.history.push(
        `/image-view/${mindmap.id}?imageUrl=${encodeURIComponent(
          mindmap.mindmapImageUrl
        )}`
      );
  };

  const handleDelete = async () => {
    console.log("Deleting mindmap");
    await deleteMindmap(mindmap);
    toast.warn("Mindmap deleted successfully");
    props.history.replace("/mindmap-list");
  };

  if (Object.keys(mindmap).length === 0) {
    return <LoadingPage />;
  }

  return (
    <React.Fragment>
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
          <span className="task__title-text">
            {!editMode && mindmap.title}
            {editMode && (
              <InputText
                value={mindmap.title}
                onChange={(e) =>
                  setMindmap({ ...mindmap, title: e.target.value })
                }
              />
            )}
          </span>
          <span
            className="task__edit-btn"
            onClick={() => setEditMode(!editMode)}
          >
            <span className="fa fa-pencil-square-o"></span>
          </span>
        </div>
        <div className="task__description">
          {!editMode && mindmap.description}
          {editMode && (
            <InputText
              value={mindmap.description}
              onChange={(e) =>
                setMindmap({ ...mindmap, description: e.target.value })
              }
            />
          )}
        </div>
        <div className="task__imagelink" onClick={handleImageLinkClick}>
          {!editMode && mindmap.mindmapImageUrl}
          {editMode && (
            <InputText
              value={mindmap.mindmapImageUrl}
              onChange={(e) =>
                setMindmap({ ...mindmap, mindmapImageUrl: e.target.value })
              }
            />
          )}
        </div>
        <div className="task__time">
          <LabelFAIcon faClass="fa fa-clock-o" label="Mindmap Created :" />
          <InputDate
            date={mindmap.creationDate}
            onDateChange={handleDateChange}
            name="task-created"
            disabled={!editMode}
          />
        </div>
        <div className="task__category">
          <LabelFAIcon faClass="fa fa-tag" label="Mindmap Category :" />
          <InputSelect
            name="category"
            value={mindmap.category}
            options={categories}
            onChange={(e) =>
              setMindmap({ ...mindmap, category: e.target.value })
            }
            disabled={!editMode}
          />
        </div>
        <div className="task__line">
          <LabelFAIcon faClass="fa fa-level-up" label="Revision Level :" />
          <InputSelect
            name="level"
            value={getRevisionLevelIdFor(mindmap.revisionLevelId)}
            options={revLevels}
            onChange={(e) =>
              setMindmap({ ...mindmap, revisionLevelId: e.target.value })
            }
            disabled={!editMode}
          />
        </div>
        <div className="task__line">
          <LabelFAIcon faClass="fa fa-gamepad" label="Revision count :" />
          <span class="label_text">{mindmap.revisionCount}</span>
        </div>
        <DeleteButtonWithModal
          className="task__delete-btn c_point"
          onClick={handleDelete}
        >
          <LabelFAIcon faClass="fa fa-trash" label="Delete Mindmap" />
        </DeleteButtonWithModal>
      </div>

      {editMode && (
        <button
          className="btn-submit fix-bottom"
          onClick={() => {
            console.log("mindmap :>> ", mindmap);
            saveMindmap(mindmap);
            setEditMode(!editMode);
          }}
        >
          Edit Task
        </button>
      )}
    </React.Fragment>
  );
}

export default MindmapViewEditForm;
