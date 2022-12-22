import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";

//components
import { Button, Modal, Tabs, Tab } from "react-bootstrap";
import { CertificateContext } from "../../context/Certificate/CertificateContext";
import { JobContext } from "../../context/Job/JobContext";
import { reqAxios } from "../../helpers/helpers";

export const GenerateCertificateModal = ({ showModal }) => {
  const {
    getAllCertificates,
    certificates,
    userIdToCertificate,
    nameToCertificate,
  } = useContext(CertificateContext);
  const { jobs, getAllJobs } = useContext(JobContext);

  const initialState = {
    type: 1,
    certificateId: "",
    userId: userIdToCertificate,
    jobId: "",
  };

  const closeModal = () => showModal(false);
  const [certificateData, setCertificateData] = useState(initialState);
  const [putDisabled, setPutDisabled] = useState(false);

  const certificateOpt = [
    { value: 1, label: "Personal", target: { value: 1, name: "type" } },
    { value: 2, label: "Por trabajo", target: { value: 2, name: "type" } },
  ];

  const allCertificates = certificates.map((certificate) => ({
    value: certificate.id,
    label: certificate.name,
    target: { value: certificate.id, name: "certificateId" },
  }));
  const allJobs = jobs.map((job) => ({
    value: job.id,
    label: job.name,
    target: { value: job.id, name: "jobId" },
  }));

  const disabled = () => {
    return !!!certificateData.type || !!!certificateData.certificateId;
  };

  const handleChange = (e, name) => {
    if (e) {
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
  const handleSubmit = async () => {
    await reqAxios("POST", `/student/create`, "", certificateData);
    closeModal();
  };

  useEffect(() => {
    getAllCertificates();
    getAllJobs(1, { authorId: userIdToCertificate });
  }, []);

  return (
    <>
      <Modal
        show={showModal}
        onHide={closeModal}
        dialogClassName="modal-80w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {`Generar Certificado para: "${nameToCertificate}"`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <div className="center-center">
            <div className="me-3" style={{ width: "350px" }}>
              <label htmlFor="forName" className="form-label">
                Certificado
              </label>
              <Select
                options={certificateOpt}
                placeholder={"seleccione.."}
                name="type"
                value={certificateOpt.filter(
                  (op) => certificateData.type === op.value
                )}
                isClearable={true}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: "#3D84A8",
                  },
                })}
                onChange={(e) => handleChange(e, "type")}
              />
            </div>
            <div className="me-3" style={{ width: "350px" }}>
              <label htmlFor="forName" className="form-label">
                Tipo de certificado
              </label>
              <Select
                options={allCertificates}
                placeholder={"seleccione.."}
                name="certificateId"
                isClearable={true}
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
            <div className="me-3" style={{ width: "350px" }}>
              <label htmlFor="forName" className="form-label">
                Trabajo
              </label>
              <Select
                options={allJobs}
                placeholder={"seleccione.."}
                isDisabled={certificateData.type === 1 ? true : false}
                name="jobId"
                isClearable={true}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: "#3D84A8",
                  },
                })}
                onChange={(e) => handleChange(e, "jobId")}
              />
            </div>
          </div>
          <div className="center-center mt-3">
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-success"
              disabled={putDisabled ? putDisabled : disabled()}
            >
              Generar
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
