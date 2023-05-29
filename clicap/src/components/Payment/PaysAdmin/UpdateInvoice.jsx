import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router";
import { EntitiesContext } from "../../../context/EntitiesContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/User/UserContext";
import { PayContext } from "../../../context/Pay/PayContext";

const UpdateInvoce = () => {
  const navigate = useNavigate();
  const { getAllUsers, userState } = useContext(UserContext);
  const { getAllPays, payState, createPayInvoice } = useContext(PayContext);
  const { pays, payData } = payState;
  const [invoce, setInvoce] = useState(payData);
  const { users } = userState;
  const { id } = useParams();
  const pay = pays.find((p) => p.id == id);
  const author = users.find((user) => user.id === pay.authorId);
  // const author = users.find(user => user?.id === pay?.authorId)

  const handleSubmit = (e) => {
    e.preventDefault();
    createPayInvoice(id, invoce);
    navigate("/pays");
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
  }, []);

  return (
    <div className="container m-5 card p-5">
      <h1 className="text-center mb-4">Datos del Pago</h1>
      <div className="mb-2">{/* <strong>Autor</strong>: {author.name} */}</div>
      <div className="mb-2">
        <strong>CUIL/CUIT</strong>:{" "}
        {pay.cuitCuil.slice(0, 2) +
          "-" +
          pay.cuitCuil.slice(2, 10) +
          "-" +
          pay.cuitCuil.slice(10, 11)}
      </div>
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

      <form onSubmit={handleSubmit}>
        <div className="">
          <input
            type="file"
            placeholder="Seleccione..."
            className="form-control"
            name="invoice"
            onChange={handleChangeInvoice}
          />
        </div>
        <div className="mt-3 text-center">
          <Button type="submit" variant="primary" className="w-25">
            Subir Factura
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateInvoce;
