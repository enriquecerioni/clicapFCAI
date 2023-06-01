import React, { useContext, useEffect } from "react";
import { ExpositionContext } from "../../context/Exposition/ExpositionContext";

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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Impedit sit tempora animi, eveniet eum ipsam quod commodi,
                  architecto neque a eius iste et sapiente placeat illum. Ab
                  delectus similique enim.
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
