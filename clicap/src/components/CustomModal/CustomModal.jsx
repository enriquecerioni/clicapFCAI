import React from "react";
import { Button, Modal } from "react-bootstrap";

export const CustomModal = ({ sizeClass='modal-80w',showModal, setShowModal, title = null, children }) => {
    
    const closeModal = ()=> setShowModal(!showModal);

    return (
    <>
      <Modal
        show={showModal}
        onHide={closeModal}
        dialogClassName={sizeClass}
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {title ? title : null}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="">{children}</Modal.Body>
      </Modal>
    </>
  );
};
