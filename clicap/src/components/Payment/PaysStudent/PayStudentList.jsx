import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { downloadFile } from "../../../helpers/helpers";

const PayStudentList = ({ pay }) => {
  const navigate = useNavigate();

  const classInactive = "shadow card-inst border-b-danger pay-card";
  const classActive = "shadow card-inst border-b-success pay-card";

  return (
    <>
      <Card
        type="button"
        className={pay.active === 0 ? classInactive : classActive}
        // onClick={() => navigate(`/pay/get/${pay.id}`)}
      >
        <Card.Body className="card p-5">
          <Card.Title className="mb-4">DETALLES DEL PAGO</Card.Title>
          <div className="">
            <div className="">
              <div className="mb-2">
                <strong>Monto</strong>: {pay.amount} - {pay.moneyType}{" "}
              </div>
              <div className="mb-2">
                <strong>Forma de Pago</strong>: {pay.payType}{" "}
              </div>
              <div className="mb-2">
                <strong>Condición Frente al IVA</strong>: {pay.iva}{" "}
              </div>
              <div className="mb-2">
                <strong>Detalle del Pago</strong>: {pay.detail}{" "}
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-primary"
                  onClick={() => downloadFile(pay.urlFile, "payments")}
                >
                  Descargar Comprobante
                </button>
              </div>
              {/* <br /> */}
              {pay.invoice ? (
                <div>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => downloadFile(pay.invoice, "invoices")}
                  >
                    Descargar Factura
                  </button>
                </div>
              ) : (
                <div className="alert alert-warning" role="alert">
                  Pronto podrás descargar tu factura aquí.
                </div>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default PayStudentList;
