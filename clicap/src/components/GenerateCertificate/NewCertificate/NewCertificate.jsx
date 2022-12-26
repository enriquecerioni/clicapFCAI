import React from "react";
import { useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { reqAxios } from "../../../helpers/helpers";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CertificateContext } from "../../../context/Certificate/CertificateContext";
import { useEffect } from "react";
import Select from "react-select";

export const NewCertificate = () => {
  const { certificateId } = useParams();
  const { certificateData, getCertificateById, certificateTypesOpt } =
    useContext(CertificateContext);
  const navigate = useNavigate();
  const [putDisabled, setPutDisabled] = useState(false);
  const [certificate, setCertificate] = useState(certificateData);
  const location = useLocation();
  const { pathname } = location;

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

  const handleSubmitEdit = async () => {
    await reqAxios(
      "POST",
      `/certificate/edit/${certificateId}`,
      "",
      certificate
    );
    navigate("/generate-certificate");
  };

  useEffect(() => {
    if (pathname === `/edit-certificate-type/${certificateId}`) {
      getCertificateById(certificateId);
    }
  }, []);

  useEffect(() => {
    setCertificate(certificateData);
  }, [certificateData]);

  return (
    <>
      <h1 className="center-center mt-3 mb-3">Nuevo tipo de certificado</h1>
      <div className="boxAddNews boxCard">
        <div className="mb-2" style={{ width: "180px" }}>
          <label htmlFor="forName" className="form-label">
            Certificado
          </label>
          <Select
            options={certificateTypesOpt}
            placeholder={"seleccione.."}
            name="type"
            value={certificateTypesOpt.filter(
              (op) => certificate.type === op.value
            )}
            isClearable={true}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "#3D84A8",
              },
            })}
            onChange={handleChange}
          />
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nombre del certificado</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={certificate.name}
            onChange={handleChange}
            placeholder="Nombre del certificado"
          />
        </Form.Group>
        {/*         <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Intro</Form.Label>
          <Form.Control
            type="text"
            name="introtext"
            value={certificate.introtext}
            onChange={handleChange}
            placeholder={
              certificate.type === 1
                ? "ha/n expuesto en modalidad Póster, el trabajo:"
                : "ha participado en el CONGRESO LATINOAMERICANO DE INGENIERÍA Y CIENCIAS APLICADAS en calidad:"
            }
          />
        </Form.Group> */}

        <label htmlFor="forName" className="form-label">
          Intro
        </label>
        <Form.Control
          className=""
          name="introtext"
          value={certificate.introtext}
          as="textarea"
          placeholder={
            certificate.type === 1
              ? "ha participado en el CONGRESO LATINOAMERICANO DE INGENIERÍA Y CIENCIAS APLICADAS en calidad:"
              : "ha/n expuesto en modalidad Póster, el trabajo:"
          }
          style={{ height: "100px" }}
          onChange={handleChange}
        />

        {certificate.type === 1 ? (
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Puesto</Form.Label>
            <Form.Control
              type="text"
              name="jobtext"
              value={certificate.jobtext}
              onChange={handleChange}
              placeholder="ASISTENTE"
            />
          </Form.Group>
        ) : null}
        
        <FloatingLabel
          controlId="floatingTextarea2"
          label="Informacion del certificado"
        >
          <Form.Control
            className="mt-3"
            name="text"
            value={certificate.text}
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: "250px" }}
            onChange={handleChange}
          />
        </FloatingLabel>
        <div className="center-center mt-3">
          {pathname !== `/edit-certificate-type/${certificateId}` ? (
            <Button
              variant="success"
              disabled={putDisabled ? putDisabled : disabled()}
              onClick={handleSubmit}
            >
              Crear certificado
            </Button>
          ) : (
            <Button
              variant="success"
              disabled={putDisabled ? putDisabled : disabled()}
              onClick={handleSubmitEdit}
            >
              Editar certificado
            </Button>
          )}
        </div>
        {/* <input type="date" className="form-date-input" onChange={handleTime} /> */}
      </div>
    </>
  );
};