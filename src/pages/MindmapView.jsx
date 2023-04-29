import React, { useEffect, useState } from "react";
import "../assets/css/home.css";
import "../assets/css/categoryCreate.css";
import "../assets/css/categoryChooser.css";
import "../assets/css/taskForm.css";
import "../assets/css/taskView.css";
import { getCategories, getMindmap } from "../services/mindmapService";
import InputDate from "../components/common/viewPage/InputDate";
import InputSelect from "../components/common/viewPage/InputSelect";
import InputNumber from "../components/common/viewPage/InputNumber";
import { getRevisionLevels } from "../services/revisionService";
import LabelFAIcon from "../components/common/viewPage/LabelFAIcon";
import LoadingPage from "../components/LoadingPage";

function MindmapView(props) {
  const [mindmap, setMindmap] = useState({});
  const [categories, setCategories] = useState([]);
  const [revLevels, setRevLevels] = useState([]);

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
        creation_date: new Date(e.target.value).toISOString(),
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
          <span className="task__title-text">{mindmap.title}</span>
          <span className="task__edit-btn">
            <span className="fa fa-pencil-square-o"></span>
          </span>
        </div>
        <div className="task__description">{mindmap.description}</div>
        <div className="task__imagelink">{mindmap.image_link}</div>
        <div className="task__time">
          <LabelFAIcon faClass="fa fa-clock-o" label="Mindmap Created :" />
          <InputDate
            date={mindmap.creation_date}
            onDateChange={handleDateChange}
            name="task-created"
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
          />
        </div>
        <div className="task__line">
          <LabelFAIcon faClass="fa fa-level-up" label="Mindmap Level :" />
          <InputSelect
            name="level"
            value={getRevisionLevelIdFor(mindmap.revision_level)}
            options={revLevels}
            onChange={(e) =>
              setMindmap({ ...mindmap, revision_level: e.target.value })
            }
          />
        </div>
        <div className="task__line">
          <LabelFAIcon faClass="fa fa-gamepad" label="Revision count :" />
          <InputNumber
            name="revision-count"
            value={mindmap.revision_count}
            onChange={(e) =>
              setMindmap({ ...mindmap, revision_count: e.target.valueAsNumber })
            }
          />
        </div>
        <button className="task__delete-btn">
          <LabelFAIcon faClass="fa fa-trash" label="Delete Task" />
        </button>
      </div>

      <button className="btn btn-submit fix-bottom">Edit Task</button>
    </main>
  );
}

export default MindmapView;
