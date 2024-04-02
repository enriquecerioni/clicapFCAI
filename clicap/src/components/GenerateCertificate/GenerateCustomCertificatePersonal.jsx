import React, { useEffect, useState, useContext } from "react";
import { Pdf } from "./Pdf";
import Select from "react-select";
import { PDFViewer } from "@react-pdf/renderer";
import { Modal } from "react-bootstrap";
import { CertificateContext } from "../../context/Certificate/CertificateContext";
import "../../App.css";

export const GenerateCustomCertificatePersonal = ({
  showModal,
  setShowModal,
}) => {
  const { getAllCertificates, ceritificateState } =
    useContext(CertificateContext);

  const { certificates, certificateTypesOpt, certificateLogo } =
    ceritificateState;

  const initialState = {
    userName: "",
    type: 1,
    certificateId: "",
    job: { author: "", members: "", name: "" },
  };

  const [certificateData, setCertificateData] = useState(initialState);
  const [showPreview, setShowPreview] = useState(false);
  const [putDisabled, setPutDisabled] = useState(false);

  const closeModal = () => setShowModal(!showModal);

  const allCertificates = certificates
    .filter((certificate) => certificate.type === certificateData.type)
    .map((certificate) => ({
      value: certificate.id,
      label: certificate.name,
      target: { value: certificate.id, name: "certificateId" },
    }));

  const certificateSelected = certificates.filter(
    (certificate) => certificate.id === certificateData.certificateId
  );

  const handleChange = (e, name) => {

    if (e) {
      if (name === "type") {
        return setCertificateData({
          ...certificateData,
          [e.target.name]: e.target.value,
          certificateId: "",
        });
      }
      return setCertificateData({
        ...certificateData,
        [e.target.name]: e.target.value,
      });
    }

    setCertificateData({
      ...certificateData,
      [name]: "",
    });
  };

  const handleChangeJobData = (e) => {
    setCertificateData({
      ...certificateData,
      job: {
        ...certificateData.job,
        [e.target.name]: e.target.value,
      },
    });
  };

  const disabled = () => {
    return !!!certificateData.type || !!!certificateData.certificateId;
  };

  useEffect(() => {
    getAllCertificates();
  }, []);

  return (
    <Modal
      show={showModal}
      onHide={closeModal}
      dialogClassName="modal-80w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          {`Generar Certificado personalizado`}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="">
        <div className="">
          <div className="d-flex">
            <div className="me-3 selector-container">
              <label htmlFor="forName" className="form-label">
                Certificado
              </label>

              <Select
                options={certificateTypesOpt}
                placeholder={"Seleccione..."}
                name="type"
                value={certificateTypesOpt.filter(
                  (op) => certificateData.type === op.value
                )}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: "#3D84A8",
                  },
                })}
                isDisabled={showPreview}
                onChange={(e) => handleChange(e, "type")}
              />
            </div>

            <div className="me-3 selector-container">
              <label htmlFor="forName" className="form-label">
                Tipo de certificado
              </label>
              <Select
                options={allCertificates}
                placeholder={"Seleccione..."}
                name="certificateId"
                isClearable={true}
                isDisabled={showPreview}
                value={allCertificates.filter(
                  (op) => certificateData.certificateId === op.value
                )}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: "#3D84A8",
                  },
                })}
                onChange={(e) => handleChange(e, "certificateId")}
              />
            </div>
          </div>

          <div className="mt-2">
            {certificateData.type === 1 ? (
              <div className="me-3">
                <label htmlFor="forName" className="form-label">
                  Nombre y Apellido - Identificacion
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="userName"
                  placeholder="Juan Pérez, DNI: 40.158.444"
                  disabled={showPreview}
                  value={certificateData.userName}
                  onChange={(e) => handleChange(e, "userName")}
                />
              </div>
            ) : null}

            {certificateData.type === 2 ? (
              <>
                <div className="me-3">
                  <label htmlFor="forName" className="form-label">
                    Autor
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="author"
                    placeholder="Pérez J."
                    disabled={showPreview}
                    value={certificateData.job?.author}
                    onChange={handleChangeJobData}
                  />
                </div>

                <div className="mt-2">
                  <label htmlFor="forName" className="form-label">
                    Coautores
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="members"
                    placeholder="García López M., García D., Sánchez R."
                    maxlength="220"
                    disabled={showPreview}
                    value={certificateData.job?.members}
                    onChange={handleChangeJobData}
                  />
                </div>

                <div className="mt-2">
                  <label htmlFor="forName" className="form-label">
                    Nombre del trabajo
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Modelización pragmática de la acción didáctica de los docentes en carreras científicas tecnológicas"
                    disabled={showPreview}
                    value={certificateData.job?.name}
                    onChange={handleChangeJobData}
                    maxlength="150"
                  />
                </div>
              </>
            ) : null}
          </div>
        </div>

        <div className="center-center mt-3 gap-3">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="btn btn-success"
            disabled={putDisabled ? putDisabled : disabled()}
          >
            {!showPreview ? "Visualizar" : "Volver a generar"}
          </button>
        </div>

        {showPreview ? (
          <div className="mt-2" style={{ height: "500px" }}>
            <PDFViewer style={{ width: "100%", height: "100%" }}>
              <Pdf
                logo={certificateLogo}
                user={certificateData.userName}
                certificate={certificateSelected[0]}
                job={certificateData.job}
              />
            </PDFViewer>
          </div>
        ) : null}
      </Modal.Body>
    </Modal>
  );
};
