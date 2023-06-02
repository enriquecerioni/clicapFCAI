import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Button, Card, Col, Row, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { reqAxios } from "../../../helpers/helpers";
import { alertSuccess } from "../../../helpers/alerts";
import { statusCorrections } from "../typesCorrections";
import { JobContext } from "../../../context/Job/JobContext";
import { Loader } from "../../Loader/Loader";
import { ClicapTooltip } from "../../ClicapTooltip/ClicapTooltip";

export const SendCorrectionAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getCorrectionsByJob, sendCorrectionApproved } =
    useContext(JobContext);

  const [stateOfCorrection, setStateOfCorrection] = useState(0);
  const [loader, setLoader] = useState(true);
  const [corrections, setCorrections] = useState([]);
  const [details, setDetails] = useState("");
  const sendMail = 1;

  const colorsBox = {
    1: {
      background: "color-success-smooth-bk",
      color: "color-success-strong",
      icon: "fa-circle-check",
    },
    2: {
      background: "color-warning-smooth-bk",
      color: "color-warning-strong",
      icon: "fa-triangle-exclamation",
    },
    3: {
      background: "color-warning-smooth-bk",
      color: "color-warning-strong",
      icon: "fa-triangle-exclamation",
    },
    4: {
      background: "color-danger-smooth-bk",
      color: "color-danger-strong",
      icon: "fa-x",
    },
  };

  const handleNewCorrection = (e) => {
    if (e) {
      return setStateOfCorrection(e.target.value);
    }
    setStateOfCorrection(0);
  };

  const sendCorrectionToStudent = async () => {
    const correctionData = {
      jobId: corrections[0].jobId,
      correctionId: stateOfCorrection,
      evaluatorId: null,
      correctionNumber: corrections[0].correctionNumber,
      details,
      sendMail,
    };
    await sendCorrectionApproved(correctionData);
    navigate("/jobs");
  };

  const copyDetails = (detail) => {
    navigator.clipboard.writeText(detail);
    alertSuccess("Copiado!");
  };

  const getAndSetCorrections = async () => {
    const allCorrections = await getCorrectionsByJob(id);
    setCorrections(allCorrections);
    setLoader(false);
  };

  const getColorClass = (value, type) => {
    if (value === null) {
      return "";
    }
    if (type === "bk") {
      return colorsBox[value].background;
    }
    return colorsBox[value].color;
  };
  const getIconByStatus = (value) => (value ? colorsBox[value].icon : "");

  useEffect(() => {
    getAndSetCorrections();
  }, []);

  return (
    <>
      <h3 className="text-center mt-1">
        Correcciones de {corrections.length ? corrections[0].job.name : null}
      </h3>
      <div className="d-flex">
        <div className="w-50">
          <div className="m-3 box-send-job">
            {corrections[0] ? (
              <div>
                <div className="center-center">
                  <div className="d-flex flex-column align-items-center">
                    <div
                      className={`mt-2 box-status-correction center-center ${getColorClass(
                        corrections[0].correction.id,
                        "bk"
                      )}`}
                    >
                      <i
                        className={`${getColorClass(
                          corrections[0].correction.id,
                          "color"
                        )} fa-solid fa-3x ${getIconByStatus(
                          corrections[0].correction.id
                        )}`}
                      ></i>
                    </div>
                    <p className="fw-bold fs-5">
                      {corrections[0].correction.name}
                    </p>
                  </div>
                </div>

                <div className="ms-2">
                  <div className="d-flex">
                    <p className="m-0 title-evaluator-correction">
                      Evaluador: &nbsp;
                    </p>
                    <p className="m-0 name-evaluator-correction">
                      {corrections[0].evaluator.name +
                        " " +
                        corrections[0].evaluator.surname}
                    </p>
                  </div>
                  <div className="center-center">
                    <hr
                      style={{ border: "1px solid grey", width: "100px" }}
                    ></hr>
                  </div>
                  <div>{corrections[0].details}</div>
                </div>
                <div className="center-center mt-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => copyDetails(corrections[0].details)}
                  >
                    Copiar Detalle
                  </button>{" "}
                </div>
              </div>
            ) : null}

            {!loader && !corrections[0] ? (
              <div className="center-center h-100 fw-bold">
                No hay correción
              </div>
            ) : null}

            {loader ? (
              <div className="center-center h-100 fw-bold">
                <Loader />
              </div>
            ) : null}
          </div>
        </div>

        <div className="w-50">
          <div className="m-3 box-send-job">
            {corrections[1] ? (
              <div>
                <div className="center-center">
                  <div className="d-flex flex-column align-items-center">
                    <div
                      className={`mt-2 box-status-correction center-center ${getColorClass(
                        corrections[1].correction.id,
                        "bk"
                      )}`}
                    >
                      <i
                        className={`${getColorClass(
                          corrections[1].correction.id,
                          "color"
                        )} fa-solid fa-3x ${getIconByStatus(
                          corrections[1].correction.id
                        )}`}
                      ></i>
                    </div>
                    <p className="fw-bold fs-5">
                      {corrections[1] ? corrections[1].correction.name : "-"}
                    </p>
                  </div>
                </div>

                <div className="ms-2">
                  <div className="d-flex">
                    <p className="m-0 title-evaluator-correction">
                      Evaluador: &nbsp;
                    </p>
                    <p className="m-0 name-evaluator-correction">
                      {corrections[1].evaluator.name +
                        " " +
                        corrections[1].evaluator.surname}
                    </p>
                  </div>
                  <div className="center-center">
                    <hr
                      style={{ border: "1px solid grey", width: "100px" }}
                    ></hr>
                  </div>
                  <div>{corrections[1].details}</div>
                </div>
                <div className="center-center mt-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => copyDetails(corrections[1].details)}
                  >
                    Copiar Detalle
                  </button>{" "}
                </div>
              </div>
            ) : null}

            {!loader && !corrections[1] ? (
              <div className="center-center h-100 fw-bold">
                No hay correción
              </div>
            ) : null}

            {loader ? (
              <div className="center-center h-100 fw-bold">
                <Loader />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-3 center-center">
        <div className="m-3 p-3 w-50 box-send-job">
          <h3 className="text-center">Corrección</h3>
          <div style={{ width: "100%" }} className="">
            <p className="m-0">Estado</p>
            <Select
              options={statusCorrections}
              placeholder={"Seleccione..."}
              name="correctionId"
              isClearable={true}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: "#3D84A8",
                },
              })}
              onChange={(e) => handleNewCorrection(e)}
            />
          </div>
          <hr />
          <div>
            <FloatingLabel controlId="floatingTextarea2" label="Comentarios">
              <Form.Control
                className="mt-3"
                name="details"
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
                onChange={(e) => setDetails(e.target.value)}
              />
            </FloatingLabel>
          </div>
          <div className="center-center">
            <ClicapTooltip
              tooltip={details === "" || stateOfCorrection === 0 ? true : false}
              text={"Por favor completar todos los campos"}
            >
              <div className="d-flex">
                <button
                  className="mt-2 btn btn-primary"
                  disabled={
                    details === "" || stateOfCorrection === 0 ? true : false
                  }
                  onClick={sendCorrectionToStudent}
                >
                  Enviar Corrección
                </button>
              </div>
            </ClicapTooltip>
          </div>
        </div>
      </div>
      {/*       <div className="mt-3 center-center">
        <Card className="mt-3 w-50">
          <Card.Header>Corrección</Card.Header>
          <Card.Body>
            <div style={{ width: "100%" }} className="">
              <p className="m-0">Estado</p>
              <Select
                options={statusCorrections}
                placeholder={"Seleccione..."}
                name="correctionId"
                isClearable={true}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: "#3D84A8",
                  },
                })}
                onChange={(e) => handleNewCorrection(e)}
              />
            </div>
            <hr />
            <div>
              <FloatingLabel controlId="floatingTextarea2" label="Comentarios">
                <Form.Control
                  className="mt-3"
                  name="details"
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: "100px" }}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </FloatingLabel>
            </div>
            <div className="center-center">
              <Button
                variant="primary"
                className="mt-2"
                disabled={
                  details === "" || stateOfCorrection === 0 ? true : false
                }
                onClick={sendCorrectionToStudent}
              >
                Enviar Corrección
              </Button>{" "}
            </div>
          </Card.Body>
        </Card>
      </div> */}
    </>
  );
};
