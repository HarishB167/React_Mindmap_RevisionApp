import React, { useEffect, useState } from "react";
import "../assets/css/home.css";
import "../assets/css/categoryCreate.css";
import "../assets/css/categoryChooser.css";
import "../assets/css/taskForm.css";
import "../assets/css/taskView.css";
import InputDate from "../components/common/viewEditPage/InputDate";
import InputSelect from "../components/common/viewEditPage/InputSelect";
import InputNumber from "../components/common/viewEditPage/InputNumber";
import InputText from "../components/common/viewEditPage/InputText";
import LabelFAIcon from "../components/common/viewEditPage/LabelFAIcon";
import LoadingPage from "../components/LoadingPage";
import {
  getCategories,
  getMindmap,
  saveMindmap,
} from "../services/mindmapService";
import { getRevisionLevels } from "../services/revisionService";

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

  if (Object.keys(mindmap).length === 0) {
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
        <div className="task__imagelink">
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
          <LabelFAIcon faClass="fa fa-level-up" label="Mindmap Level :" />
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
          <InputNumber
            name="revision-count"
            value={mindmap.revisionCount}
            onChange={(e) =>
              setMindmap({ ...mindmap, revisionCount: e.target.valueAsNumber })
            }
            disabled={!editMode}
          />
        </div>
        <button className="task__delete-btn">
          <LabelFAIcon faClass="fa fa-trash" label="Delete Task" />
        </button>
      </div>

      {editMode && (
        <button
          className="btn btn-submit fix-bottom"
          onClick={() => {
            console.log("mindmap :>> ", mindmap);
            saveMindmap(mindmap);
            setEditMode(!editMode);
          }}
        >
          Edit Task
        </button>
      )}
    </main>
  );
}

export default MindmapViewEditForm;
