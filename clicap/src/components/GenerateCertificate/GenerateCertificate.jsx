import React, { useContext, useEffect, useState } from "react";
import { CertificateContext } from "../../context/Certificate/CertificateContext";
import "./generateCertificate.css";
import { useLocation, useNavigate } from "react-router-dom";
import { GenerateCertificateModal } from "./GenerateCertificateModal";
import Users from "../Users/Users";

export const GenerateCertificate = () => {
  const navigate = useNavigate();

  const { getAllCertificates, ceritificateState, getCertificatesLogo } =
    useContext(CertificateContext);

  const { certificateLogo } = ceritificateState;

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getAllCertificates();

    if (certificateLogo === "") {
      getCertificatesLogo();
    }
  }, []);

  return (
    <>
      {/* MODAL FILTER */}
      {showModal ? (
        <GenerateCertificateModal
          showModal={showModal}
          setShowModal={setShowModal}
        />
      ) : null}

      <h1 className="center-center">Generar Certificado</h1>
      <div>
        <div className="text-end me-5">
          <button
            type="button"
            onClick={() => navigate("/certificate-types")}
            className="btn btn-secondary"
          >
            Ver tipos de certificados
          </button>
        </div>
      </div>
      <div>
        <Users showModalCertificate={setShowModal} />
      </div>
    </>
  );
};
