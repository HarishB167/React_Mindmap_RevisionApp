import React from "react";

const Input = ({ error, ...rest }) => {
  return (
    <React.Fragment>
      <input {...rest} />
      {error && <div className="alert alert-danger">{error}</div>}
    </React.Fragment>
  );
};

export default Input;
