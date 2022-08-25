import React from "react";
import { CorrectionList } from "./CorrectionList";
import { Button } from "react-bootstrap";

export const Corrections = ({ job }) => {
  const corrections = [
    { detail: "dgafdgfdg", state: "Aceptado", date: "20-08-2022" },
  ];
  return (
    <>
      <h2 className="text-center">Correcciones del TP2</h2>
      <div className="text-end me-3">
        <Button variant="primary">Descargar Ult. Version</Button>
      </div>
      {corrections.length > 0 ? (
        <>
          <div style={{ overflowX: "auto" }}>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Detalle</th>
                </tr>
              </thead>
              <tbody>
                {corrections.map((correction, i) => (
                  <CorrectionList
                    key={i}
                    correction={correction}
                    /*     setCustomerToDelete={handleDelete} */
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
    </>
  );
};
