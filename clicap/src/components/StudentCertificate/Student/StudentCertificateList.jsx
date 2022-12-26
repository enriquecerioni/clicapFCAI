import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

const StudentCertificateList = ({ certificate }) => {
  const navigate = useNavigate();

  const classInactive = "shadow card-inst border-b-danger";
  const classActive = "shadow card-inst border-b-success";

  return (
    <>
      <Card
        type="button"
        style={{ width: "60rem", marginBottom: "1.5rem" }}
        className={certificate.active === 0 ? classInactive : classActive}
      >
        <Card.Body>
          <Card.Title className="text-center mb-2">CERTIFICADO DE ALUMNO REGULAR</Card.Title>
          <div className="cardbody-job">
            <div className="">
              <div className="text-center mb-2"><strong>Descripción:</strong> {certificate.detail}</div>
              <div className="text-center">
                <button className="btn btn-primary">Descargar Certificado (AR)</button>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default StudentCertificateList;
