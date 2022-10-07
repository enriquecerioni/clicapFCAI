import React, { useEffect } from "react";
import { useContext } from "react";
import { Button, Card, Col, Row, FloatingLabel, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { EntitiesContext } from "../../../context/EntitiesContext";
import Select from "react-select";

export const SendCorrectionAdmin = () => {
  const { id } = useParams();
  const { corrections, getCorrectionsByJob } = useContext(EntitiesContext);
  useEffect(() => {
    getCorrectionsByJob(id);
  }, []);
  return (
    <>
      <h3 className="text-center mt-1">Correcciones de {corrections[0].job.name}</h3>
      <Row>
        <Col sm={6}>
          <Card className="mt-3 h-100">
            <Card.Header className="left-right">
              <h5 className="m-0">
                {corrections.length ? corrections[0].jobId : null}
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
                <Button variant="primary">Copiar Detalle</Button>{" "}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} className="">
          <Card className="mt-3 h-100">
            <Card.Header className="left-right">
              <h5 className="m-0">
                {corrections.length ? corrections[1].jobId : "-"}
              </h5>
              <h5 className="m-0">1</h5>
            </Card.Header>
            <Card.Body>
              <Card.Title className="text-center fw-bold">
                {corrections.length ? corrections[1].correction.name : "-"}
              </Card.Title>
              <hr />
              <Card.Text>
                {corrections.length ? corrections[1].details : "-"}
              </Card.Text>
              <div className="center-center">
                <Button variant="primary">Copiar Detalle</Button>{" "}
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
                options={""}
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
                /* onChange={(e) => handleNewCorrection(e, "correctionId")} */
              />
            </div>
            <hr />
            <Card.Text>
              <FloatingLabel controlId="floatingTextarea2" label="Comentarios">
                <Form.Control
                  className="mt-3"
                  name="details"
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: "100px" }}
                  /* onChange={(e) => handleNewCorrection(e, "details")} */
                />
              </FloatingLabel>
            </Card.Text>
            <div className="center-center">
              <Button variant="primary">Enviar Corrección</Button>{" "}
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
