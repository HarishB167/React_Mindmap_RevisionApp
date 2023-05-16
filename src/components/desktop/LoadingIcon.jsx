import React from "react";
import "./LoadingIcon.css";

function LoadingIcon({ isLoading }) {
  return (
    <span className="loading_icon">
      {isLoading && (
        <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
      )}
    </span>
  );
}

export default LoadingIcon;
