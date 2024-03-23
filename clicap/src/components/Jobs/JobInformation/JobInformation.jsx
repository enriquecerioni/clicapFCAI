import React, { Fragment, useContext, useEffect, useState } from "react";
import "./jobInformation.css";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { EntitiesContext } from "../../../context/EntitiesContext";

export const JobInformation = () => {
  const { jobId, getJobId } = useContext(EntitiesContext);
  const navigate = useNavigate();
  const [partner, setPartners] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getJobId(id);
  }, []);

  return (
    <>
      <div className="card">
        {jobId ? (
          <div className="card-body">
            <h2 className="card-title text-center">{jobId.name}</h2>
            <div className="body-box">
              {/* AREA */}
              <div className="icon-text-box">
                <i className="fa-solid fa-square me-2"></i>
                <div>
                  <p className="m-0 fw-bold">Área</p>
                  <p className="m-0">{jobId.name ? jobId.area.name : null}</p>
                </div>
              </div>
              {/* MODALIDAD */}
              <div className="icon-text-box">
                <i className="fa-solid fa-file-lines me-2"></i>
                <div>
                  <p className="m-0 fw-bold">Modalidad</p>
                  <p className="m-0">
                    {jobId.name ? jobId.jobmodality.name : null}
                  </p>
                </div>
              </div>
            </div>
            <div className="body-box mt-3">
              {/* INTEGRANTES */}
              <div className="icon-text-box">
                <i className="fa-solid fa-users me-2"></i>
                <div>
                  <p className="m-0 fw-bold">Integrantes</p>
                  {jobId.name
                    ? jobId.members.map((member, i) => {
                        return (
                          <Fragment key={i}>
                            <p className="m-0">{member}</p>
                          </Fragment>
                        );
                      })
                    : null}
                </div>
              </div>
              {/* EVALUADORES */}
              <div className="icon-text-box">
                <i className="fa-solid fa-clipboard-check me-2"></i>
                <div>
                  <p className="m-0 fw-bold">Evaluadores</p>
                  <p className="m-0">
                    {jobId.evaluatorId1 ? jobId.evaluator1.name : null}
                  </p>
                  <p className="m-0">
                    {jobId.evaluatorId2 ? jobId.evaluator2.name : null}
                  </p>
                </div>
              </div>
              {/* ESTADO */}
              <div className="icon-text-box">
                <div className="text-center">
                  <p className="m-0 fw-bold">Estado</p>
                  <i className="fa-solid fa-circle"></i>
                </div>
              </div>
            </div>
            <div className="text-center mt-3">
              <Button
                variant="primary"
                onClick={() => navigate("/job/corrections/1")}
              >
                Ver Correcciones
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};
