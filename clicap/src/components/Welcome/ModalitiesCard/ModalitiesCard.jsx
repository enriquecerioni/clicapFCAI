import React from "react";
import './modalitiesCard.css';
import { Loader } from "../../Loader/Loader";

export const ModalitiesCard = ({ areas, goAndFiltered, getAmountByJobComplete }) => {
  
  
    return (
    <div className="text-center border dashboard-card">
      <h2 className="">Trabajos Completos</h2>
      <div className="center-center">
        <hr style={{ border: "1px solid grey", width: "100px" }}></hr>
      </div>
      <div className="flexColumn">
        {areas.length > 0 ? (
          areas.map((area) => {
            return (
              <button
                type="button"
                className="btnAreas"
                onClick={() => goAndFiltered(area.id, 1)}
              >
                <div className="d-flex justify-content-between">
                  <p className="m-0 title-modality-welcome">{area.name}</p>
                  <div
                    className="amount-worksbymodality-box center-center"
                    style={{
                      backgroundColor: "#B0DAFF",
                      border: "1px solid #19A7CE",
                    }}
                  >
                    <p className="m-0 ">{`${getAmountByJobComplete(
                      area.id
                    )}`}</p>
                  </div>
                </div>
              </button>
            );
          })
        ) : (
          <Loader />
        )}
      </div>
      <button
        type="button"
        className="btnViewAll"
        onClick={() => goAndFiltered("", 1)}
      >
        {/* {`Ver todos (${completeJobsTotal().completes})`} */}
        {`Ver todos`}
      </button>
    </div>
  );
};
