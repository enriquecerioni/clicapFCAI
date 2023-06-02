import React from "react";

//components
import { Button, Modal, Tabs, Tab } from "react-bootstrap";

export const CorrectionModal = ({ jobName, showModal, correction }) => {
  const closeModal = () => showModal(false);

  return (
    <>
      <Modal
        show={showModal}
        onHide={closeModal}
        dialogClassName="modal-80w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {jobName} <br /> ({correction.correction.name})
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="">{correction.details}</Modal.Body>
      </Modal>
    </>
  );
};
