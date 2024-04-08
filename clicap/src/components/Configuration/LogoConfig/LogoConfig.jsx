import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import {
  formDataAxios,
  reqAxios,
  waitAndRefresh,
} from "../../../helpers/helpers";

export const LogoConfig = () => {
  const [imgLoaded, setImgLoaded] = useState({
    certificateImg: "",
    appLogoImg: "",
  });
  const [logoApp, setLogoApp] = useState({
    name: "logoApp",
    urlFile: "",
  });
  const [certificateBg, setCertificateBg] = useState({
    name: "certificateLogo",
    urlFile: "",
  });

  const handleChange = (e, state, setState) => {
    let value =
      e.target.type === "file"
        ? e.target.value === ""
          ? ""
          : e.target.files[0]
        : e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };
  const saveLogoApp = async (state) => {
    try {
      const bodyFormData = new FormData();
      for (const key in state) {
        bodyFormData.append(key, state[key]);
      }
      await formDataAxios("POST", `/certificate/savelogo`, "", bodyFormData);
      waitAndRefresh("/configuration", 500);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = (e, state) => {
    e.preventDefault();
    saveLogoApp(state);
    waitAndRefresh("/configuration", 500);
  };

  const loadImgs = async () => {
    const certificateLogo = await reqAxios(
      "GET",
      `/certificate/getcertificatelogo/certificateLogo`,
      "",
      ""
    );
    const AppLogo = await reqAxios(
      "GET",
      `/certificate/getcertificatelogo/appLogo`,
      "",
      ""
    );
    setImgLoaded({
      ["appLogoImg"]: AppLogo.data.response,
      ["certificateImg"]: certificateLogo.data.response,
    });
  };

  useEffect(() => {
    loadImgs();
  }, []);

  return (
    <>
      <div className="section-header">
        <h2>Logo / Fondo</h2>
      </div>

      <div className="center-center">
        <div className="widthConfig boxCard">
          <Form.Label className="fw-bold">Logo del evento</Form.Label>
          <div className="">
            <input
              type="file"
              className="form-control"
              name="urlFile"
              onChange={(e) => handleChange(e, logoApp, setLogoApp)}
            />
          </div>
          <div className="mb-3">
            <Button
              variant="success"
              className="w-100"
              onClick={(e) => handleSubmit(e, logoApp)}
            >
              Guardar
            </Button>{" "}
          </div>
          <div className="mt-3 mb-3 text-center">
            <p className="fw-bold">Logo:</p>
            {imgLoaded.appLogoImg !== "" ? (
              <img
                className="showImgLogo"
                src={`data:image/png;base64,${imgLoaded.appLogoImg}`}
                alt=""
              />
            ) : (
              "No hay Logo"
            )}
          </div>
          <div className="p-3">
            <hr />
          </div>
          <Form.Label className="fw-bold">Fondo del certificado</Form.Label>
          <Alert key="info" variant="info">
            <i class="fa fa-circle-info m-2" aria-hidden="true"></i>
            Dimensiones de la imágen: <strong>3509 x 2481</strong>
          </Alert>
          <div className="">
            <input
              type="file"
              className="form-control"
              name="urlFile"
              onChange={(e) => handleChange(e, certificateBg, setCertificateBg)}
            />
          </div>
          <div className="">
            <Button
              variant="success"
              className="w-100"
              onClick={(e) => handleSubmit(e, certificateBg)}
            >
              Guardar
            </Button>{" "}
          </div>
          <div className="mt-3 text-center">
            <p className="fw-bold">Fondo:</p>
            {imgLoaded.certificateImg !== "" ? (
              <img
                className="showImg"
                src={`data:image/png;base64,${imgLoaded.certificateImg}`}
                alt=""
              />
            ) : (
              "No hay Fondo de imagen"
            )}
          </div>
        </div>
      </div>
    </>
  );
};
