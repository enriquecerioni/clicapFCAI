import React from "react";
import "./jobInformation.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const JobInformation = () => {
  const navigate=useNavigate();
  return (
    <>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-center">Nombre</h2>
          <div className="body-box">
            {/* AREA */}
            <div className="icon-text-box">
              <i className="fa-solid fa-square me-2"></i>
              <div>
                <p className="m-0 fw-bold">Área</p>
                <p className="m-0">Contabilidad</p>
              </div>
            </div>
            {/* MODALIDAD */}
            <div className="icon-text-box">
              <i className="fa-solid fa-file-lines me-2"></i>
              <div>
                <p className="m-0 fw-bold">Modalidad</p>
                <p className="m-0">Resumen</p>
              </div>
            </div>
          </div>
          <div className="body-box mt-3">
            {/* INTEGRANTES */}
            <div className="icon-text-box">
              <i className="fa-solid fa-users me-2"></i>
              <div>
                <p className="m-0 fw-bold">Integrantes</p>
                <p className="m-0">Enrique Cerioni</p>
                <p className="m-0">Gaston rodrigez</p>
                <p className="m-0">Francisco Oteo</p>
              </div>
            </div>
            {/* EVALUADORES */}
            <div className="icon-text-box">
              <i className="fa-solid fa-clipboard-check me-2"></i>
              <div>
                <p className="m-0 fw-bold">Evaluadores</p>
                <p className="m-0">Tomas gañan</p>
                <p className="m-0">Alexis Verardo</p>
              </div>
            </div>
            {/* ESTADO */}
            <div className="icon-text-box">
              <div className="text-center">
                <p className="m-0 fw-bold">Estado</p>
                <i class="fa-solid fa-circle"></i>
              </div>
            </div>
          </div>
          <div className="text-center mt-3">
            <Button variant="primary" onClick={()=>navigate('/job/corrections/1')}>Ver Correcciones</Button>
          </div>
        </div>
      </div>
    </>
  );
};
