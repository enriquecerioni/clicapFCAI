import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { downloadFile } from "../../../helpers/helpers";
import "../StudentCertificate.css";

const StudentCertificateList = ({ certificate }) => {
  const navigate = useNavigate();

  return (
    <>
      <Card className="student-certificate-card">
        <Card.Body className="text-center card p-5">
          <Card.Title className="mb-4">
            CERTIFICADO DE ALUMNO REGULAR
          </Card.Title>

          <div className="text-center mb-2">
            <strong>Descripción:</strong> {certificate.detail}
          </div>
          <div className="text-center">
            <button
              className="btn btn-primary"
              onClick={() =>
                downloadFile(certificate.urlFile, "regularcertificates")
              }
            >
              Descargar Certificado (AR)
            </button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default StudentCertificateList;
