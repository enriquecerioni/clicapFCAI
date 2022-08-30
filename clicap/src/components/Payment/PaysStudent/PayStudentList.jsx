import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

const PayStudentList = ({ pay }) => {
  const navigate = useNavigate();

  const classInactive = "shadow card-inst border-b-danger";
  const classActive = "shadow card-inst border-b-success";

  return (
    <>
      <Card
        type="button"
        style={{ width: "60rem" }}
        className={pay.active === 0 ? classInactive : classActive}
        onClick={() => navigate(`/pay/get/${pay.id}`)}
      >
        <Card.Body>
          <Card.Title className="text-center mb-2">COMPROBANTE DE PAGO</Card.Title>
          <div className="cardbody-job">
            <div className="">
              <div className="text-center mb-2">{pay.moneyType} - {pay.amount} </div>
              <div>
                <button className="btn btn-primary">Descargar Comprobante</button>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default PayStudentList;
