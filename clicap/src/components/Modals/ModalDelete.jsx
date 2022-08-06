import React from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteAxios, waitAndRefresh } from "../../helpers/helpers";

const ModalDelete = ({ entity, showAlert }) => {
  //entity.entityType -> instance/partner/customer
  console.log(entity);
  const deleteEntity = async () => {
    const entityDeleted = await deleteAxios(
      `/${entity.entityType}/delete/${entity.id}`
    );
    console.log("----"+entityDeleted);
    showAlert(false);
    if (entityDeleted.status === 200) {
      console.log("entro");
      waitAndRefresh(`/${entity.entityType}`, 1000);
    }
  };
  return (
    <>
      <Modal show={true} backdrop="static" centered>
        <Modal.Header>
          <Modal.Title>
            ¿Desea eliminar a <strong>{entity.entityName}</strong>?
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
