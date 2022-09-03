import React, { useContext, useEffect } from "react";
import { CorrectionList } from "./CorrectionList";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { EntitiesContext } from "../../../context/EntitiesContext";

export const Corrections = () => {
  const { id } = useParams();
  const { getCorrectionsByJob, corrections, getJobId, jobId } =
    useContext(EntitiesContext);

  useEffect(() => {
    getJobId(id);
    getCorrectionsByJob(id);
  }, []);
  return (
    <>
      <h2 className="text-center">
        Correcciones del {jobId ? jobId.name : null}
      </h2>
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
