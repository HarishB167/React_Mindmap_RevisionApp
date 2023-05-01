import React from "react";

function InputNumber({ name, value, onChange, ...rest }) {
  return (
    <input
      {...rest}
      type="number"
      className="task__input-number"
      name={name}
      id={name}
      value={value}
      onChange={onChange}
    />
  );
}

export default InputNumber;
