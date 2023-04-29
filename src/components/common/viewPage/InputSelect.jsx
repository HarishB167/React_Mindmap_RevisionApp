import React from "react";

const InputSelect = ({ name, value, options, onChange }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="task__input-select"
    >
      <option>--</option>
      {options.map((item, idx) => (
        <option value={item.value} key={idx}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default InputSelect;