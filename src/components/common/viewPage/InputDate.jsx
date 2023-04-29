import React from "react";
import { formatDate } from "../../../services/utils";

const InputDate = ({ name, date, onDateChange }) => {
  return (
    <input
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
