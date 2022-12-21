import React, { useContext, useEffect } from "react";
import { CertificateContext } from "../../context/Certificate/CertificateContext";
import "./generateCertificate.css";
import { useNavigate } from "react-router-dom";

export const GenerateCertificate = () => {
  const navigate = useNavigate();
  const { getAllCertificates } = useContext(CertificateContext);

  useEffect(() => {
    getAllCertificates();
  }, []);

  return (
    <>
      <h1 className="center-center">Generar Certificado</h1>
      <div>
        <div className="text-end me-5">
          <button
            type="button"
            onClick={() => navigate("/new-certificate-type")}
            className="btn btn-success"
          >
            <i className="fa-solid fa-plus"></i> Crear nuevo tipo de certificado
          </button>
        </div>
      </div>
    </>
  );
};
