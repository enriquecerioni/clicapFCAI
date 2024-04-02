import React, { useContext, useEffect, useState } from "react";
import { CertificateContext } from "../../context/Certificate/CertificateContext";
import "./generateCertificate.css";
import { useNavigate } from "react-router-dom";
import { GenerateCertificateModal } from "./GenerateCertificateModal";
import Users from "../Users/Users";
import { GenerateCustomCertificatePersonal } from "./GenerateCustomCertificatePersonal";
import "./generateCertificate.css";

export const GenerateCertificate = () => {
  const navigate = useNavigate();

  const { getAllCertificates, ceritificateState, getCertificatesLogo } =
    useContext(CertificateContext);

  const { certificateLogo } = ceritificateState;

  const [showModal, setShowModal] = useState(false);
  const [customCertificateShowModal, setCustomCertificateShowModal] =
    useState(false);

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

      {customCertificateShowModal ? (
        <GenerateCustomCertificatePersonal
          showModal={customCertificateShowModal}
          setShowModal={setCustomCertificateShowModal}
        />
      ) : null}

      <h1 className="center-center">Generar Certificado</h1>

      <div className="row mt-2">
        <div className="col d-flex justify-content-center">
          <div
            className="boxCard card-to-generate-certificate"
            type="button"
            onClick={() => navigate("/certificate-types")}
          >
            <div className="text-center mb-3">
              <i className="fa-2x fa-solid fa-list"></i>
            </div>
            <div>
              <h4>Tipos de certificados</h4>
              <p>
                Desde aquí se pueden crear y ver los distintos tipos de
                certificados que existen.
              </p>
            </div>
          </div>
        </div>

        <div className="col d-flex justify-content-center">
          <div
            className="boxCard card-to-generate-certificate"
            type="button"
            onClick={() =>
              setCustomCertificateShowModal(!customCertificateShowModal)
            }
          >
            <div className="text-center mb-3">
              <i className="fa-2x fa-solid fa-id-card"></i>
            </div>
            <div>
              <h4>Generar certificado personalizado</h4>
              <p>
                Desde aquí se pueden crear los certificados y se pueden
                modificar los nombres ya sea de estudiantes o trabajos.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Users showModalCertificate={setShowModal} />
      </div>
    </>
  );
};
