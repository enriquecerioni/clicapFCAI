import React, { useEffect, useContext, useState } from "react";
import { CertificateContext } from "../../context/Certificate/CertificateContext";
import { useNavigate } from "react-router-dom";
import { CertificatesList } from "./CertificatesList";
import ModalDelete from "../Modals/ModalDelete";

export default function CertificateTypes() {
  const navigate = useNavigate();
  const { getAllCertificates, getCertificatesLogo, ceritificateState } =
    useContext(CertificateContext);
  const { certificates, certificateLogo } = ceritificateState;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [certificateToDelete, setCertificateToDelete] = useState({});

  useEffect(() => {
    getAllCertificates();

    if (certificateLogo === "") {
      getCertificatesLogo();
    }
  }, []);
  return (
    <>
      {showDeleteModal ? (
        <ModalDelete
          entity={certificateToDelete}
          showAlert={setShowDeleteModal}
        />
      ) : null}

      <div>
        <h1 className="center-center">Certificados</h1>

        <div>
          <div className="text-end me-5">
            <button
              type="button"
              onClick={() => navigate("/new-certificate-type")}
              className="btn btn-success"
            >
              <i className="fa-solid fa-plus me-2"></i>
              Crear Certificado
            </button>
          </div>
        </div>

        {certificates.length > 0 ? (
          <>
            <div style={{ overflowX: "auto" }} className="p-3">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Texto</th>
                    <th>Tipo</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {certificates.map((certificate) => (
                    <CertificatesList
                      certificate={certificate}
                      showAlert={setShowDeleteModal}
                      setCertificateToDelete={setCertificateToDelete}
                      key={certificate.id}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p className="text-center">No hay certificados</p>
        )}
      </div>
    </>
  );
}
