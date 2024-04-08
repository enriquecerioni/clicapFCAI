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
  const { payState, createPayInvoice, getPayById } = useContext(PayContext);
  const { payData } = payState;
  const [invoce, setInvoce] = useState(payData);
  const { users } = userState;
  const { id } = useParams();
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
    getPayById(id);
    if (users.length === 0) {
      getAllUsers();
    }
  }, [refreshPays]);

  console.log({
    payData,
  })

  return (
    <div className="pay-container">
      <div className="pay-card update-invoice">
        <h2 className="text-center mb-4">Datos del pago</h2>
        <div className="mb-3">
          <strong>CUIL/CUIT</strong>:{" "}
          {payData.cuitCuil.slice(0, 2) +
            "-" +
            payData.cuitCuil.slice(2, 10) +
            "-" +
            payData.cuitCuil.slice(10, 11)}
        </div>
        <div className="mb-3">
          <strong>Monto</strong>: {payData.amount} - {payData.moneyType}{" "}
        </div>
        <div className="mb-3">
          <strong>Forma de Pago</strong>: {payData.payType}{" "}
        </div>
        <div className="mb-3">
          <strong>Condición Frente al IVA</strong>: {payData.iva}{" "}
        </div>
        <div className="mb-3">
          <strong>Detalle del Pago</strong>: {payData.detail}{" "}
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
