import React, { useContext, useEffect } from "react";
import { ExpositionContext } from "../../context/Exposition/ExpositionContext";
import { Button } from "react-bootstrap";
import { downloadFile } from "../../helpers/helpers";

export const Exposition = () => {
  const { getAllExpositions, expositionState } = useContext(ExpositionContext);
  const { expositions } = expositionState;

  useEffect(() => {
    if (expositions.length === 0) {
      getAllExpositions();
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="section-header">
          <h2>Dinámica de Exposiciones</h2>
        </div>
      </div>
      <div className="center-center fs-4 ">
        <div className="d-flex flex-wrap center-center">
          {expositions.length > 0 ? (
            expositions.map((exposition, i) => (
              <div key={i} className="information-card">
                <div className="d-flex justify-content-start align-items-center">
                  <i
                    className="fa-regular fa-circle-check"
                    style={{ color: "#2864f6" }}
                  ></i>
                  <p className="m-0 ms-2 fw-bold">{exposition.name}</p>
                </div>
                <div className="mt-4">
                  El póster deberá incluir el contenido del trabajo en formato
                  de hoja A3 y será de organización libre. Se solicita que el
                  póster sea lo más gráfico posible y con textos legibles a 1 m
                  de distancia. Se adjunta la plantilla sugerida para su
                  elaboración.
                </div>
                <div className="center-center">
                  <Button
                    variant="primary"
                    className="w-50 mt-5"
                    onClick={() => downloadFile("poster.pptx", "expositions")}
                  >
                    Descargar plantilla
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="center-center">
              No hay exposiciones por el momento
            </div>
          )}
        </div>
      </div>
    </>
  );
};
