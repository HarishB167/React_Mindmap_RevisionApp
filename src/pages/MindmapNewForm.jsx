import React, { useEffect, useState } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import CategoryChooser from "./CategoryChooser";
import Input from "../components/common/Input";
import LoadingPage from "../components/LoadingPage";
import { getRevisionLevels } from "../services/revisionService";
import { getCategories } from "../services/categoryService";
import { saveMindmap } from "../services/mindmapService";
import "./MindmapNewForm.css";

const schema = {
  id: Joi.optional(),
  title: Joi.string().required().label("Title"),
  description: Joi.string().required().label("Description"),
  mindmapImageUrl: Joi.string().required().label("Image Url"),
  category: Joi.number().required().label("Category"),
  revisionLevelId: Joi.number().required().label("Revision Level"),
};

function MindmapNewForm(props) {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    mindmapImageUrl: "",
    category: "",
    revisionLevelId: "",
  });
  const [errors, setErrors] = useState({});

  const [categoryPickerShow, setCategoryPickerShow] = useState(false);
  const [revisionLevels, setRevisionLevels] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const setCategory = (category) => {
    setFormData({ ...formData, category });
  };

  useEffect(() => {
    async function retrieveRevisionLevelsAndCategories() {
      setIsLoading(true);
      const rLvl = await getRevisionLevels();
      setRevisionLevels(rLvl);
      const ctgs = await getCategories();
      setCategories(ctgs);
      setIsLoading(false);
    }
    retrieveRevisionLevelsAndCategories();
  }, []);

  const handleSubmit = async () => {
    const result = validate();
    console.log("result :>> ", result);
    if (result) {
      setErrors(result);
      toast.error("Please fill form completely");
      return;
    }
    try {
      await saveMindmap(formData);
      props.history.replace("/");
    } catch (ex) {
      toast.error("Error occured : " + ex.response.data.toString());
    }
  };

  const validate = () => {
    const result = Joi.validate(formData, schema, {
      abortEarly: false,
    });
    if (!result.error) return null;

    const errors = {};

    for (let item of result.error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const subSchema = { [name]: schema[name] };
    console.log("obj :>> ", obj);
    console.log("subSchema :>> ", subSchema);
    const { error } = Joi.validate(obj, subSchema);
    return error ? error.details[0].message : null;
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="container_mindmap_form">
      <div className="modal-box">
        <form action="" className="form">
          <div className="form-group">
            <label htmlFor="task-title" className="form__title">
              Add Mindmap Task
            </label>
            <Input
              id="task-title"
              name="task-title"
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              error={errors["title"]}
              required
            />
            <Input
              id="task-description"
              name="task-description"
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              error={errors["description"]}
              required
            />
            <Input
              id="task-mindmap-image-url"
              name="task-mindmap-image-url"
              type="text"
              placeholder="Image url"
              value={formData.mindmapImageUrl}
              onChange={(e) =>
                setFormData({ ...formData, mindmapImageUrl: e.target.value })
              }
              error={errors["mindmapImageUrl"]}
              required
            />
            <select
              name="revision-level"
              id="task-mindmap-revision-level"
              required
              onChange={(e) =>
                setFormData({ ...formData, revisionLevelId: e.target.value })
              }
            >
              <option value="">Select level</option>
              {revisionLevels.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.level}
                </option>
              ))}
            </select>
          </div>
          <div className="form__options">
            <span
              className="fa fa-tag"
              onClick={() => setCategoryPickerShow(true)}
            ></span>
            {formData.category && (
              <span>
                {categories.find((item) => item.id == formData.category).name}
              </span>
            )}
            <span
              className={`form__sendbtn ${
                validate() ? " form__sendbtn--disabled" : ""
              }`}
              onClick={handleSubmit}
            >
              <span className="fa fa-angle-double-right"></span>
            </span>
          </div>
        </form>
      </div>
      <CategoryChooser
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          background: `rgba(18, 18, 18, 0.6)`,
          display: categoryPickerShow ? "flex" : "none",
        }}
        categories={categories}
        onCategorySelected={(ctgId) => {
          setCategory(ctgId);
          setCategoryPickerShow(false);
        }}
        outsideClicked={() => setCategoryPickerShow(false)}
        {...props}
      />
    </div>
  );
}

export default MindmapNewForm;
