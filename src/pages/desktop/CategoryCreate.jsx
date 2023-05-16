import React, { useState } from "react";
import Input from "../../components/desktop/Input";
import LoadingIcon from "../../components/desktop/LoadingIcon";
import { saveCategory } from "../../services/categoryService";
import "./CategoryCreate.css";

function CategoryCreate(props) {
  const [category, setCategory] = useState({ id: "", title: "" });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await saveCategory(category);
    setIsSaving(false);
    props.history.goBack();
  };

  const validate = () => {
    return !(category.title && category.title.length > 0);
  };

  return (
    <div class="category_create_form_container">
      <form className="category_create_form" onSubmit={handleSubmit}>
        <span className="category_create_form_title">CATEGORY CREATE</span>
        <Input
          label="Category name"
          name="category"
          value={category.title}
          handleChange={(e) =>
            setCategory({ ...category, title: e.target.value })
          }
        />
        <button
          className="submit"
          type="submit"
          disabled={validate() || isSaving}
        >
          Submit
        </button>
        <LoadingIcon isLoading={isSaving} />
      </form>
    </div>
  );
}

export default CategoryCreate;
