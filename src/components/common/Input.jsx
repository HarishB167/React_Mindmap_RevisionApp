import React from "react";

const Input = ({ error, ...rest }) => {
  return (
    // <div className="form-group">
    //   <label htmlFor={name}>{label}</label>
    //   <input {...rest} name={name} id={name} className="form-control" />
    //   {error && <div className="alert alert-danger">{error}</div>}
    // </div>
    <React.Fragment>
      <input {...rest} />
      {error && <div className="alert alert-danger">{error}</div>}
    </React.Fragment>
  );
};

export default Input;
