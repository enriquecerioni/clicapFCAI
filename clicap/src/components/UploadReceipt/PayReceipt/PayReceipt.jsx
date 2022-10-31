import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "../upload-receipt.css";
import { Button } from "react-bootstrap";
import { getDataUserByKey } from "../../../helpers/helpers";
import { EntitiesContext } from "../../../context/EntitiesContext";
import { useNavigate } from "react-router-dom";

const PayReceipt = () => {
  const navigate = useNavigate();
  const { pay, handleChangePay, createNewPay } = useContext(EntitiesContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewPay();
    navigate("/mypays");
  };

  return (
    <>
      <div className="poderver flex-column container card p-5 ">
        <h2 className="text-center">Subir Comprobante de Pago</h2>
        <div className="mt-4 centerUpdateJob">
          <form onSubmit={handleSubmit}>
            <div className="d-flex form-regis-responsive">
              {/* MONTO */}
              <div className="">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label fw-bold"
                >
                  Monto ($)
                </label>
                <div className="">
                  <input
                    type="text"
                    placeholder="Ingrese el monto..."
                    className="form-control"
                    name="amount"
                    value={pay.amount}
                    onChange={handleChangePay}
                  />
                </div>
              </div>

              {/* Moneda */}
              <div className="ms-2">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label fw-bold"
                >
                  Moneda
                </label>
                <div className="">
                  <select
                    className="form-select"
                    name="moneyType"
                    value={pay.moneyType}
                    onChange={handleChangePay}
                  >
                    <option value={""}>Seleccione</option>
                    <option value={"ARS"}>ARS</option>
                    <option value={"USD"}>USD</option>
                  </select>
                </div>
              </div>

              {/* Modo de Pago */}
              <div className="ms-2">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label fw-bold"
                >
                  Modo de Pago
                </label>
                <div className="">
                  <select
                    className="form-select"
                    name="payType"
                    value={pay.payType}
                    onChange={handleChangePay}
                  >
                    <option value={""}>Seleccione</option>
                    <option value={"Transferencia"}>Transferencia</option>
                    <option value={"Efectivo"}>Efectivo</option>
                  </select>
                </div>
              </div>
            </div>
            {/* CUIT - CUIL */}
            <div className="mt-2">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label fw-bold"
              >
                CUIT/CUIL
              </label>
              <div className="">
                <input
                  type="text"
                  placeholder="12-12345678-12"
                  className="form-control"
                  name="cuitCuil"
                  value={pay.cuitCuil}
                  onChange={handleChangePay}
                />
              </div>
            </div>
             {/* IVA */}
            <div className="mt-2">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label fw-bold"
              >
                Condición Frente al IVA
              </label>
              <div className="">
              <select
                    className="form-select"
                    name="iva"
                    value={pay.iva}
                    onChange={handleChangePay}
                  >
                    <option value={""}>Seleccione</option>
                    <option value={"IVA Exento"}>IVA Exento</option>
                    <option value={"Responsable Inscripto"}>Responsable Inscripto</option>
                    <option value={"Monotributista"}>Monotributista</option>
                  </select>
              </div>
            </div>
             {/* Detalle */}
             <div className="mt-2">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label fw-bold"
              >
                Detalle
              </label>
              <div className="">
                <input
                  type="text"
                  placeholder="Descripción adicional sobre el comprobante..."
                  className="form-control"
                  name="detail"
                  value={pay.detail}
                  onChange={handleChangePay}
                />
              </div>
            </div>
            {/* Archivo */}
            <div className="mt-2">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label fw-bold"
              >
                Comprobante
              </label>
              <div className="">
                <input
                  type="file"
                  placeholder="Seleccione..."
                  className="form-control"
                  name="urlFile"
                  onChange={handleChangePay}
                />
              </div>
            </div>
            <div className="mt-3 center-center">
              <Button type="submit" variant="primary">
                Subir Comprobante
              </Button>
            </div>
          </form>
          {/*           <Button onClick={() => console.log(job)} variant="primary">
            console
          </Button> */}
        </div>
      </div>
    </>
  );
};
export default PayReceipt;
