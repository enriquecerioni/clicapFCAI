import React from "react";

//components
import { Button, Modal, Tabs, Tab } from "react-bootstrap";

export const CorrectionModal = ({ showModal }) => {
  const closeModal = () => showModal(false);

  return (
    <>
      <Modal
        show={showModal}
        onHide={closeModal}
        dialogClassName="modal-50w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Corrección
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="">Descripcion</Modal.Body>
      </Modal>
    </>
  );
};
