import React from "react";
import "./Input.css";

const Input = ({ label, name, value, handleChange, error }) => {
  return (
    <React.Fragment>
      <label htmlFor={name} className="form_label">
        {label}
      </label>
      <input
        className="form_input"
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={handleChange}
      />
      {error && (
        <div
          className="alert alert-danger"
          style={{ color: "darkorange", fontSize: "1.5rem" }}
        >
          {error}
        </div>
      )}
    </React.Fragment>
  );
};

export default Input;
