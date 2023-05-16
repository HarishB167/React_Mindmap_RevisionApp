import React from "react";
import "./Select.css";

const Select = ({
  label,
  name,
  value,
  handleChange,
  optionsList,
  keyId,
  keyValue,
  error,
}) => {
  return (
    <>
      <label htmlFor={name} className="form_label">
        {label}
      </label>
      <select
        className="form_select"
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      >
        <option value="">Select level</option>
        {optionsList.map((item) => (
          <option key={item[keyId]} value={item[keyId]}>
            {item[keyValue]}
          </option>
        ))}
      </select>
      {error && (
        <div
          className="alert alert-danger"
          style={{ color: "darkorange", fontSize: "1.5rem" }}
        >
          {error}
        </div>
      )}
    </>
  );
};

export default Select;
