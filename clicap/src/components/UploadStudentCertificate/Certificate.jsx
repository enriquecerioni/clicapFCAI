import React, { useContext, useEffect } from "react";
import { useState } from "react";
// import "../upload-receipt.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getDataUserByKey, waitAndRefresh } from "../../helpers/helpers";
import { StudentContext } from "../../context/StudentCertificate/StudentContext";

const Certificate = () => {
  const navigate = useNavigate();
  const { studentState, createNewCertificate } =
    useContext(StudentContext);
  const { studentInitial } = studentState;
  const [certificate, setCertificate] = useState(studentInitial);
  const [putDisabled, setPutDisabled] = useState(false);
  const userId = getDataUserByKey("id");

  const disabled = () => {
    return !!!certificate.detail || !!!certificate.urlFile;
  };

  const handleChangeCertificate = (e) => {
    let value =
      e.target.type === "file"
        ? e.target.value === ""
          ? ""
          : e.target.files[0]
        : e.target.value;
    setCertificate({
      ...certificate,
      ["authorId"]: userId,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewCertificate(certificate);
    waitAndRefresh("/student");
  };

  return (
    <div className="boxCard centerBox">
      <div className="poderver flex-column p-5">
        <h2 className="text-center">Certificado de Alumno Regular</h2>
        <div className="mt-4 centerUpdateJob">
          <form onSubmit={handleSubmit}>
            {/* Detalle */}
            <div className="mt-2">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label fw-bold"
              >
                Detalle (opcional)
              </label>
              <div className="">
                <input
                  type="text"
                  placeholder="Descripción adicional sobre el comprobante..."
                  className="form-control"
                  name="detail"
                  value={certificate.detail}
                  onChange={handleChangeCertificate}
                />
              </div>
            </div>
            {/* Archivo */}
            <div className="mt-2">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label fw-bold"
              >
                Certificado
              </label>
              <div className="">
                <input
                  type="file"
                  placeholder="Seleccione...."
                  className="form-control"
                  name="urlFile"
                  onChange={handleChangeCertificate}
                />
              </div>
            </div>
            <div className="mt-3 center-center">
              <Button
                type="submit"
                variant="primary"
                disabled={putDisabled ? putDisabled : disabled()}
              >
                Subir Certificado
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Certificate;
