import React from "react";
import { formatDate } from "../../../services/utils";
import "./InputDate.css";

const InputDate = ({ name, date, onDateChange, ...rest }) => {
  return (
    <input
      {...rest}
      type="date"
      className="task__input-date"
      name={name}
      id={name}
      value={formatDate(new Date(date))}
      onChange={onDateChange}
    />
  );
};

export default InputDate;
