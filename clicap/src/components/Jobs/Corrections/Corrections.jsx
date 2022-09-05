import React, { useContext, useEffect } from "react";
import { CorrectionList } from "./CorrectionList";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { EntitiesContext } from "../../../context/EntitiesContext";
import axios from "axios";

export const Corrections = () => {
  const { id } = useParams();
  const { getCorrectionsByJob, corrections, getJobId, jobId } =
    useContext(EntitiesContext);

  const downloadFile = async (nameFile) => {
    try {
      await axios({
        url: `http://localhost:3000/api/clicap/job/downloadfile?nameFile=${nameFile}`, //your url
        params: "",
        method: "GET",
        responseType: "blob", // important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${nameFile}`); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
      return "Descargado";
    } catch (error) {
      console.log(error);
    }
  };

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
        <Button variant="primary" onClick={() => downloadFile(jobId.urlFile)}>
          Descargar Ult. Version
        </Button>
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
      )}
    </>
  );
};
