import React, { useState, useRef, useEffect } from "react";
import "./Modal.css";

function Modal({ showModal, onModalCancel, header, body, footer, ...props }) {
  const modal = useRef();

  const handleOutsideClick = (e) => {
    if (e.target == modal.current) {
      onModalCancel();
    }
  };

  return (
    <div
      className="modal"
      onClick={handleOutsideClick}
      ref={modal}
      style={{ display: showModal ? "flex" : "none" }}
    >
      {props.children || (
        <div className="modal-content">
          {header && (
            <div className="modal-header">
              <span className="close" onClick={() => onModalCancel()}>
                &times;
              </span>
              {header}
            </div>
          )}
          {body && <div className="modal-body">{body}</div>}
          {footer && <div className="modal-footer">{footer}</div>}
        </div>
      )}
    </div>
  );
}

export default Modal;
