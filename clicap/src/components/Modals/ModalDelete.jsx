import React from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteAxios, deleteFile, waitAndRefresh } from "../../helpers/helpers";

const ModalDelete = ({ entity, showAlert }) => {
  //entity.entityType -> instance/partner/customer
  console.log(entity);
  
  if(entity.entityType === 'pay'){
    deleteFile(entity.receipt, 'payments');
    deleteFile(entity.invoice, 'invoices');
  } else if(entity.entityType === 'job'){
    deleteFile(entity.job, 'documents');
  }

  const deleteEntity = async () => {

    const entityDeleted = await deleteAxios(
      `/${entity.entityType}/delete/${entity.id}`
    );
    console.log("----" + entityDeleted);
    showAlert(false);
    if (entityDeleted.status === 200) {
      console.log("entro");
      if(entity.entityType === 'new'){
        waitAndRefresh(`/news`, 1000);
      } else if(entity.entityType === 'area'){
        waitAndRefresh(`/configuration`, 1000);
      } else if(entity.entityType === 'job'){
        waitAndRefresh(`/jobs`, 1000);
      } else {
        waitAndRefresh(`/${entity.entityType}`, 1000);
      }
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
