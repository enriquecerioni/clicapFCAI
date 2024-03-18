import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { PDFViewer } from "@react-pdf/renderer";
//components
import { Button, Modal, Tabs, Tab } from "react-bootstrap";
import { CertificateContext } from "../../context/Certificate/CertificateContext";
import { JobContext } from "../../context/Job/JobContext";
import { reqAxios } from "../../helpers/helpers";
import { Pdf } from "./Pdf";

export const GenerateCertificateModal = ({ showModal, setShowModal }) => {
  const { getAllCertificates, ceritificateState } =
    useContext(CertificateContext);

  const {
    certificates,
    nameToCertificate,
    userIdToCertificate,
    certificateTypesOpt,
    certificateLogo,
  } = ceritificateState;

  const { getAllJobsByUser } = useContext(JobContext);

  const initialState = {
    type: "",
    certificateId: "",
    userId: userIdToCertificate,
    jobId: "",
  };

  const closeModal = () => setShowModal(!showModal);
  const [certificateData, setCertificateData] = useState(initialState);
  const [jobsUser, setJobsUser] = useState([]);
  const [putDisabled, setPutDisabled] = useState(false);

  const allCertificates = certificates.map((certificate) => ({
    value: certificate.id,
    label: certificate.name,
    target: { value: certificate.id, name: "certificateId" },
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

  const getAllJobsByUserAndSetJobs = async () => {
    const allJobs = await getAllJobsByUser(userIdToCertificate);
    const allJobsSelector = allJobs.map((item, i) => {
      return {
        label: item.name,
        value: item.id,
        target: { name: "jobId", value: item.id },
      };
    });
    setJobsUser(allJobsSelector);
  };

  useEffect(() => {
    getAllCertificates();
    getAllJobsByUserAndSetJobs();
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
                options={certificateTypesOpt}
                placeholder={"Seleccione..."}
                name="type"
                value={certificateTypesOpt.filter(
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
                placeholder={"Seleccione..."}
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
                options={jobsUser}
                placeholder={"Seleccione..."}
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

          <div className="mt-2" style={{ height: "500px" }}>
            <PDFViewer style={{ width: "100%", height: "100%" }}>
              <Pdf logo={certificateLogo} />
            </PDFViewer>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
