import React, { useContext, useEffect, useState } from "react";
import { CorrectionList } from "./CorrectionList";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { EntitiesContext } from "../../../context/EntitiesContext";
import axios from "axios";
import { NewCorrections } from "./NewCorrections";
import { downloadFile, getDataUserByKey } from "../../../helpers/helpers";
//components

export const Corrections = () => {
  const { id } = useParams();
  const roleId = getDataUserByKey("roleId");
  const { getCorrectionsByJob, corrections, getJobId, jobId } =
    useContext(EntitiesContext);

  const [newCorrection, setNewCorrection] = useState(false);

  useEffect(() => {
    getJobId(id);
    getCorrectionsByJob(id);
  }, []);
  return (
    <>
      <h2 className="text-center">
        Correcciones del {jobId ? jobId.name : null}
      </h2>
      <div className="text-end me-3 mt-3">
        {!newCorrection && roleId === 2 ? (
          <Button
            variant="success"
            className="me-3"
            onClick={() => setNewCorrection(!newCorrection)}
          >
            Nueva Corrección
          </Button>
        ) : null}
        <Button variant="primary" onClick={() => downloadFile(jobId.urlFile, 'documents')}>
          Descargar Ult. Version
        </Button>
      </div>

      {!newCorrection ? (
        corrections.length > 0 ? (
          <>
            <div style={{ overflowX: "auto" }}>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Detalle</th>
                    <th></th>
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
        )
      ) : (
        <NewCorrections />
      )}
    </>
  );
};
