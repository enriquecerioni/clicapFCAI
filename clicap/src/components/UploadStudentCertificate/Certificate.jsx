import React, { useContext, useEffect } from "react";
import { useState } from "react";
// import "../upload-receipt.css";
import { Button } from "react-bootstrap";
import { getDataUserByKey } from "../../helpers/helpers";
import { EntitiesContext } from "../../context/EntitiesContext";
import { useNavigate } from "react-router-dom";

const Certificate = () => {
  const navigate = useNavigate();
  const { certificate, handleChangeCertificate, createNewCertificate } =
    useContext(EntitiesContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewCertificate();
    navigate("/student");
  };

  return (
    <>
      <div className="poderver  flex-column">
        <h2>Certificado de Alumno Regular</h2>
        <div className="mt-4 centerUpdateJob">
          <form onSubmit={handleSubmit}>
            {/* Detalle */}
            <div className="mt-2">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label fw-bold"
              >
                Detalle
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
                  placeholder="Seleccione..."
                  className="form-control"
                  name="urlFile"
                  onChange={handleChangeCertificate}
                />
              </div>
            </div>
            <div className="mt-3 center-center">
              <Button type="submit" variant="primary">
                Subir Certificado
              </Button>
            </div>
          </form>
          {/*           <Button onClick={() => console.log(job)} variant="primary">
            console
          </Button> */}
        </div>
      </div>
    </>
  );
};
export default Certificate;
