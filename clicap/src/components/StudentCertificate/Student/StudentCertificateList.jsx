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
        style={{ width: "60rem" }}
        className={certificate.active === 0 ? classInactive : classActive}
        onClick={() => navigate(`/certificate/get/${certificate.id}`)}
      >
        <Card.Body>
          <Card.Title className="text-center mb-2">CERTIFICADO DE ALUMNO REGULAR</Card.Title>
          <div className="cardbody-job">
            <div className="">
              <div className="text-center mb-2">{certificate.detail}</div>
              <div>
                <button className="btn btn-primary">Descargar Comprobante</button>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default StudentCertificateList;
