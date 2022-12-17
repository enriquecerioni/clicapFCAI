import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardCertificate from "./CardCertificate";
export default function CertificatesUser() {
  return (
    <>
      <div className="p-3">
      <CardCertificate />
{/*         <Container>
          <Row>
            <Col className="text-center">
              <div className="card-certicate">
                <CardCertificate />
              </div>
            </Col>
            <Col>HOLA</Col>
          </Row>
          <Row>
            <Col>HOLA</Col>
            <Col>HOLA</Col>
          </Row>
        </Container> */}
      </div>
    </>
  );
}
