import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import ModalDelete from "../../Modals/ModalDelete";
import { EntitiesContext } from "../../../context/EntitiesContext";
import { PaysAdminList } from "./PaysAdminList";

const PaysAdmin = () => {
  const navigate = useNavigate();
  const { allPays, getAllPays, users, getAllUsers } =
    useContext(EntitiesContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [PayToDelete, setPayToDelete] = useState(false);

  useEffect(() => {
    getAllUsers();
    getAllPays();
  }, []);
  return (
    <>
      {/*     CAMBIAR */}
      {/* style={{ margin: "0 5rem 0 5rem" }} */}
      <div style={{ margin: "5rem" }}>
        <h2 className="text-center">Pagos</h2>
        <div className="d-flex justify-content-end">
          {/*           <Button
            className="btn btn-success"
            onClick={() => navigate("/customers/create")}
          >
            <i className="fa-solid fa-plus"></i> Subir trabajo
          </Button> */}
        </div>
        {showDeleteModal ? (
          <ModalDelete
            entity={PayToDelete}
            showAlert={setShowDeleteModal}
          />
        ) : null}
        {allPays.length > 0 ? (
          <>
            <div style={{ overflowX: "auto" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Autor</th>
                    <th>CUIL / CUIT</th>
                    <th>Condición Frente al IVA</th>
                    <th>Monto</th>
                    <th>Modo de Pago</th>
                    <th>Detalle</th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {allPays.map((pay) => (
                    <PaysAdminList
                      pay={pay}
                      users={users}
                      showAlert={setShowDeleteModal}
                      setPayToDelete={setPayToDelete}
                      key={pay.id}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            {/*  <PaginationCustom
              currentPage={page}
              totalPages={totalPages}
              paginate={setPage}
            /> */}
          </>
        ) : (
          <p className="text-center">No hay Trabajos</p>
        )}
      </div>
    </>
  );
};
export default PaysAdmin;
