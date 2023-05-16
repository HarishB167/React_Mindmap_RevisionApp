import React, { useEffect, useState } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import LoadingPage from "../../components/LoadingPage";
import { getRevisionLevels } from "../../services/revisionService";
import { getCategoriesList } from "../../services/categoryService";
import { saveMindmap } from "../../services/mindmapService";
import "./MindmapNewForm.css";
import Input from "../../components/desktop/Input";
import Select from "../../components/desktop/Select";

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
  const [revisionLevels, setRevisionLevels] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const setCategory = (category) => {
    setFormData({ ...formData, category });
  };

  useEffect(() => {
    async function retrieveRevisionLevelsAndCategories() {
      setIsLoading(true);
      const rLvl = await getRevisionLevels();
      setRevisionLevels(rLvl);
      const ctgs = await getCategoriesList();
      setCategories(ctgs);
      setIsLoading(false);
    }
    retrieveRevisionLevelsAndCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = validate();
    console.log("result :>> ", result);
    validateProperty({ name: "title", value: "somevalue" });
    if (result) {
      setErrors(result);
      toast.error("Please fill form completely");
      return;
    }
    try {
      setIsSaving(true);
      await saveMindmap(formData);
      setIsSaving(false);
      props.history.replace("/");
    } catch (ex) {
      toast.error("Error occured : " + ex.response.data.toString());
      setIsSaving(false);
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
    return (
      <div className="mindmap_form_container">
        <LoadingPage />
      </div>
    );
  }

  return (
    <div class="mindmap_form_container">
      <form className="mindmap_form" onSubmit={handleSubmit}>
        <span className="mindmap_form_title">NEW MINDMAP</span>
        <Input
          label="Title"
          name="title"
          value={formData.title}
          handleChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          error={errors["title"]}
        />
        <Input
          label="Description"
          name="description"
          value={formData.description}
          handleChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          error={errors["description"]}
        />
        <Input
          label="Image URL"
          name="mindmapImageUrl"
          value={formData.mindmapImageUrl}
          handleChange={(e) =>
            setFormData({ ...formData, mindmapImageUrl: e.target.value })
          }
          error={errors["mindmapImageUrl"]}
        />
        <Select
          label="Revision Level"
          name="revisionLevel"
          value={formData.revisionLevelId}
          handleChange={(e) =>
            setFormData({ ...formData, revisionLevelId: e.target.value })
          }
          optionsList={revisionLevels}
          keyId="id"
          keyValue="level"
          error={errors["revisionLevelId"]}
        />
        <Select
          label="Category"
          name="category"
          value={formData.category}
          handleChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          optionsList={categories}
          keyId="id"
          keyValue="name"
          error={errors["category"]}
        />
        <button
          className="submit"
          type="submit"
          disabled={validate() || isSaving}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default MindmapNewForm;
