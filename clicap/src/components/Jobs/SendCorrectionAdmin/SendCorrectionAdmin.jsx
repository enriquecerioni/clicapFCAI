import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Button, Card, Col, Row, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { EntitiesContext } from "../../../context/EntitiesContext";
import Select from "react-select";
import { reqAxios } from "../../../helpers/helpers";
import { alertSuccess } from "../../../helpers/alerts";

export const SendCorrectionAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { corrections, getCorrectionsByJob } = useContext(EntitiesContext);
  const [stateOfCorrection, setStateOfCorrection] = useState(0);
  const [details, setDetails] = useState("");
  const sendMail = 1;
  const statusCorrections = [
    { label: "Aceptado", target: { name: "correctionId", value: 1 } },
  ];
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
      details,
      sendMail,
    };
    await reqAxios("POST", "/jobdetails/create", "", correctionData);
    navigate("/jobs");
  };

  const copyDetails = (detail) => {
    navigator.clipboard.writeText(detail);
    alertSuccess("Copiado!");
  };

  useEffect(() => {
    getCorrectionsByJob(id);
  }, []);
  return (
    <>
      <h3 className="text-center mt-1">
        Correcciones de {corrections.length ? corrections[0].job.name : null}
      </h3>
      <Row>
        <Col sm={6}>
          <Card className="mt-3 h-100">
            <Card.Header className="left-right">
              <h5 className="m-0">
                {corrections.length
                  ? corrections[0].evaluator.name +
                    " " +
                    corrections[0].evaluator.surname
                  : null}
              </h5>
              <h5 className="m-0">1</h5>
            </Card.Header>
            <Card.Body>
              <Card.Title className="text-center fw-bold">
                {corrections.length ? corrections[0].correction.name : null}
              </Card.Title>
              <hr />
              <Card.Text>
                {corrections.length ? corrections[0].details : null}
              </Card.Text>
              <div className="center-center">
                <Button
                  variant="primary"
                  onClick={() => copyDetails(corrections[0].details)}
                >
                  Copiar Detalle
                </Button>{" "}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} className="">
          <Card className="mt-3 h-100">
            <Card.Header className="left-right">
              <h5 className="m-0">
                {corrections.length && corrections[1]
                  ? corrections[1].evaluator.name +
                    " " +
                    corrections[1].evaluator.surname
                  : "-"}
              </h5>
              <h5 className="m-0">2</h5>
            </Card.Header>
            <Card.Body>
              <Card.Title className="text-center fw-bold">
                {corrections.length && corrections[1]
                  ? corrections[1].correction.name
                  : "-"}
              </Card.Title>
              <hr />
              <Card.Text>
                {corrections.length && corrections[1]
                  ? corrections[1].details
                  : "-"}
              </Card.Text>
              <div className="center-center">
                <Button
                  variant="primary"
                  onClick={() => copyDetails(corrections[1].details)}
                >
                  Copiar Detalle
                </Button>{" "}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="mt-3 center-center">
        <Card className="mt-3 w-50">
          <Card.Header>Corrección</Card.Header>
          <Card.Body>
            <div style={{ width: "100%" }} className="">
              <p className="m-0">Estado</p>
              <Select
                options={statusCorrections}
                placeholder={"seleccione.."}
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
      </div>
    </>
  );
};
