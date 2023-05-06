import React, { useState } from "react";
import Modal from "./Modal";
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
          <div className="buttonModal">
            <span>Are you really want to delete?</span>
            <div className="buttonModal-group">
              <button
                className="buttonModal-cancel"
                onClick={() => setModalVisible(false)}
              >
                Cancel
              </button>
              <button className="buttonModal-confirm" onClick={props.onClick}>
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
