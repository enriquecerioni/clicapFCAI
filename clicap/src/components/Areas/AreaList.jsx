import React, { useContext, useEffect } from "react";
import { AreaContext } from "../../context/Area/AreaContext";

export const AreaList = () => {
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
      <div className="center-center fs-4 ">
        <div className="">
          {areas.length > 0 ? (
            areas.map((area, i) => (
              <div key={i} className="">
                <div className="d-flex justify-content-start align-items-center">
                  <i
                    className="fa-regular fa-circle-check"
                    style={{ color: "#2864f6" }}
                  ></i>
                  <p className="m-0 ms-2 fw-bold">{area.name}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="center-center">No hay áreas por el momento</div>
          )}
        </div>
      </div>
    </>
  );
};
