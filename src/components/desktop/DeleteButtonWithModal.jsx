import React, { useState } from "react";
import Modal from "../common/Modal";
import "./DeleteButtonWithModal.css";

function DeleteButtonWithModal(props) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <React.Fragment>
      <button {...props} onClick={() => setModalVisible(true)}>
        {props.children}
      </button>
      {modalVisible && (
        <Modal
          showModal={modalVisible}
          onModalCancel={() => setModalVisible(false)}
        >
          <div className="buttonModal-desktop">
            <span>Are you really want to delete?</span>
            <div className="buttonModal-desktop-group">
              <button
                className="buttonModal-desktop-cancel"
                onClick={() => setModalVisible(false)}
              >
                Cancel
              </button>
              <button
                className="buttonModal-desktop-confirm"
                onClick={props.onClick}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
}

export default DeleteButtonWithModal;
