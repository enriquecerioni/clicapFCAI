import React, { useContext, useEffect } from "react";
import { AreaContext } from "../../context/Area/AreaContext";
import './Area.css';

export const Area = () => {
  const { getAllAreas, areaState } = useContext(AreaContext);
  const { areas } = areaState;

  useEffect(() => {
    if (areas.length === 0) {
      getAllAreas();
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="section-header">
          <h2>Áreas</h2>
        </div>
      </div>
      <div className="center-center fs-4">
        <div className="d-flex flex-wrap center-center">
          {areas.length > 0 ? (
            areas.map((area, i) => (
              <div key={i} className="information-card-area">
                <div className="d-flex justify-content-start">
                  <i
                    className="fa-solid fa-pen mt-2"
                    style={{ color: "#2864f6" }}
                  ></i>
                  <p className="m-0 ms- areaTitle">{area.name}</p>
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
