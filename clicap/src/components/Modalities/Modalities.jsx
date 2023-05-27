import React, { useContext, useEffect } from "react";
import { ModalitiesContext } from "../../context/Modalities/ModalitiesContext";

export const Modalities = () => {
  const { getAllModalities, modalitiesState } = useContext(ModalitiesContext);
  const { modalities } = modalitiesState;

  useEffect(() => {
    if (modalities.length === 0) {
      getAllModalities();
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="section-header">
          <h2>Modalidades de presentación</h2>
        </div>
      </div>
      <div className="center-center fs-4 ">
        <div className="">
          {modalities.length > 0 ? (
            modalities.map((modality, i) => (
              <div key={i} className="">
                <div className="d-flex justify-content-start align-items-center">
                  <i
                    className="fa-regular fa-circle-check"
                    style={{ color: "#2864f6" }}
                  ></i>
                  <p className="m-0 ms-2 fw-bold">{modality.name}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="center-center">
              No hay modalidades por el momento
            </div>
          )}
        </div>
      </div>
    </>
  );
};
