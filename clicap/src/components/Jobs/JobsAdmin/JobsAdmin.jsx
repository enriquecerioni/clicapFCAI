import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { JobsAdminList } from "./JobsAdminList";
import ModalDelete from "../../Modals/ModalDelete";
import { EntitiesContext } from "../../../context/EntitiesContext";

const JobsAdmin = () => {
  const navigate = useNavigate();
  const { allJobs, getAllJobs, users, getAllUser } =
    useContext(EntitiesContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    getAllUser();
    getAllJobs();
  }, []);
  return (
    <>
      {/*     CAMBIAR */}
      {/* style={{ margin: "0 5rem 0 5rem" }} */}
      <div style={{ margin: "5rem 5rem 0 5rem" }}>
        <h2 className="text-center">Trabajos</h2>
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
            /* entity={customerToDelete} */
            showAlert={setShowDeleteModal}
            /* getCallback={() => getallJobs(page)} */
          />
        ) : null}
        {allJobs.length > 0 ? (
          <>
            <div style={{ overflowX: "auto" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Autor</th>
                    <th>Nombre TP</th>
                    <th>Evaludor 1</th>
                    <th>Evaludor 2</th>
                    <th>Area</th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {allJobs.map((work) => (
                    <JobsAdminList
                      work={work}
                      users={users}
                      /*     setCustomerToDelete={handleDelete} */
                      key={work.id}
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
          <p className="text-center">No hay registros</p>
        )}
      </div>
    </>
  );
};
export default JobsAdmin;
