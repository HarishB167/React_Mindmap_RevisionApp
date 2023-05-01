import React from "react";
import "./InputText.css";

function InputText({ name, value, onChange, ...rest }) {
  return (
    <input
      {...rest}
      type="text"
      className="task__input-text"
      name={name}
      id={name}
      value={value}
      onChange={onChange}
    />
  );
}

export default InputText;
