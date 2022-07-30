import React from "react";
import { useNavigate } from "react-router-dom";
import { WorkList } from "./WorkList";
import {Button} from 'react-bootstrap';

const Works = () => {
  const navigate = useNavigate();

  const worksPaginated = [
    {
      autor: "Ivan Castro",
      name: "Tp1",
      evaluatorId1: "Lionel Messi",
      evaluatorId2: "Martin Palermo",
      areaName: "Contabilidad",
    },
  ];
  return (
    <>
        {/*     CAMBIAR */}
        {/* style={{ margin: "0 5rem 0 5rem" }} */}
      <div style={{ margin: "5rem 5rem 0 5rem" }}>
        <h2 className="text-center">Trabajos</h2>
        <div className="d-flex justify-content-end">
          <Button
            className="btn btn-success"
            onClick={() => navigate("/customers/create")}
          >
            <i className="fa-solid fa-plus"></i> Subir trabajo
          </Button>
        </div>
        {/*         {deleteAlert ? (
          <AlertDelete
            entity={customerToDelete}
            showAlert={setDeleteAlert}
            getCallback={() => getworksPaginated(page)}
          />
        ) : null} */}
        {worksPaginated.length > 0 ? (
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
                  {worksPaginated.map((work) => (
                    <WorkList
                      work={work}
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
export default Works;
