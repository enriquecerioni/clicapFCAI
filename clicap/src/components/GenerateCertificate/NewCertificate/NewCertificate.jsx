import React from "react";
import { useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { reqAxios } from "../../../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CertificateContext } from "../../../context/Certificate/CertificateContext";

export const NewCertificate = () => {
  const { certificateData } = useContext(CertificateContext);
  const navigate = useNavigate();
  const [putDisabled, setPutDisabled] = useState(false);
  const [certificate, setCertificate] = useState(certificateData);
  /*   const disabled = () => {
    return !!!correction.correctionId || !!!correction.details.trim();
  }; */

  const handleChange = (e) => {
    setCertificate({
      ...certificate,
      [e.target.name]: e.target.value,
    });
  };

  const disabled = () => {
    return !!!certificate.name || !!!certificate.text;
  };
  const handleSubmit = async () => {
    await reqAxios("POST", `/certificate/create`, "", certificate);
    navigate("/generate-certificate");
  };
  return (
    <>
      <h1 className="center-center mt-3 mb-3">Nuevo tipo de certificado</h1>
      <div className="boxAddNews boxCard">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nombre del certificado</Form.Label>
          <Form.Control
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Nombre del certificado"
          />
        </Form.Group>
        <FloatingLabel
          controlId="floatingTextarea2"
          label="Informacion del certificado"
        >
          <Form.Control
            className="mt-3"
            name="text"
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: "100px" }}
            onChange={handleChange}
          />
        </FloatingLabel>
        <div className="center-center mt-3">
          <Button
            variant="success"
            disabled={putDisabled ? putDisabled : disabled()}
            onClick={handleSubmit}
          >
            Crear certificado
          </Button>
        </div>
        {/* <input type="date" className="form-date-input" onChange={handleTime} /> */}
      </div>
    </>
  );
};
