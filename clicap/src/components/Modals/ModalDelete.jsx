import React from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteAxios, deleteFile, waitAndRefresh } from "../../helpers/helpers";

const ModalDelete = ({ entity, showAlert }) => {
  //entity.entityType -> instance/partner/customer

  const deleteEntity = async () => {
    if (entity.entityType === 'pay') {
      deleteFile(entity.receipt, 'payments');
      deleteFile(entity.invoice, 'invoices');
    } else if (entity.entityType === 'job') {
      entity.jobVersions.forEach(version => {
        deleteFile(version.urlFile, 'documents');
      });
    } else if (entity.entityType === 'new') {
      deleteFile(entity.image, 'news');
    } else if (entity.entityType === 'regular-certificates') {
      deleteFile(entity.certificate, 'regularcertificates');
    }
    const entityDeleted = await deleteAxios(
      `/${entity.entityType}/delete/${entity.id}`
    );

    showAlert(false);
    if (entityDeleted?.status === 200) {
      waitAndRefresh(entity.navigate, 1000);
    }
  };

  return (
    <>
      <Modal show={true} backdrop="static" centered>
        <Modal.Header>
          <Modal.Title>
            ¿Desea eliminar <strong>{entity.entityName}</strong>?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => showAlert(false)}>
            Cerrar
          </Button>
          <Button variant="danger" onClick={deleteEntity}>
            Sí, eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalDelete;
