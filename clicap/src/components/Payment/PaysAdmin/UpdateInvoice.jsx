import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/User/UserContext";
import { PayContext } from "../../../context/Pay/PayContext";
import "../pays.css";
import { ClicapTooltip } from "../../ClicapTooltip/ClicapTooltip";
import { waitAndRefresh } from "../../../helpers/helpers";

const UpdateInvoce = () => {
  const navigate = useNavigate();
  const { getAllUsers, userState } = useContext(UserContext);
  const { getAllPays, payState, createPayInvoice } = useContext(PayContext);
  const { pays, payData } = payState;
  const [invoce, setInvoce] = useState(payData);
  const { users } = userState;
  const { id } = useParams();
  const pay = pays.find((p) => p.id === id);
  const [refreshPays, setRefreshPays] = useState(false);
  const disabled = () => (invoce.invoice === "" ? true : false);

  const handleSubmit = (e) => {
    e.preventDefault();
    createPayInvoice(id, invoce);
    setRefreshPays(!refreshPays);
    navigate("/pays");
    waitAndRefresh("/pays", 500)
  };

  const handleChangeInvoice = (e) => {
    let value = e.target.files[0];
    setInvoce({
      ...invoce,
      [e.target.name]: value,
    });
  };

  useEffect(() => {
    getAllPays();
    if (users.length === 0) {
      getAllUsers();
    }
  }, [refreshPays]);

  return (
    <div className="pay-container">
      <div className="pay-card update-invoice">
        <h2 className="text-center mb-4">Datos del pago</h2>
        <div className="mb-3">
          <strong>CUIL/CUIT</strong>:{" "}
          {pay.cuitCuil.slice(0, 2) +
            "-" +
            pay.cuitCuil.slice(2, 10) +
            "-" +
            pay.cuitCuil.slice(10, 11)}
        </div>
        <div className="mb-3">
          <strong>Monto</strong>: {pay.amount} - {pay.moneyType}{" "}
        </div>
        <div className="mb-3">
          <strong>Forma de Pago</strong>: {pay.payType}{" "}
        </div>
        <div className="mb-3">
          <strong>Condición Frente al IVA</strong>: {pay.iva}{" "}
        </div>
        <div className="mb-3">
          <strong>Detalle del Pago</strong>: {pay.detail}{" "}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="">
            <input
              type="file"
              placeholder="Seleccione...."
              className="form-control"
              name="invoice"
              onChange={handleChangeInvoice}
            />
          </div>
          <div className="mt-3 text-center">
            <ClicapTooltip tooltip={disabled()} text="Debe subir una factura">
              <div className="d-flex center-center">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-25"
                  disabled={disabled()}
                >
                  Subir Factura
                </Button>
              </div>
            </ClicapTooltip>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateInvoce;
