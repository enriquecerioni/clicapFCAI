import React, { useContext, useEffect } from "react";
import { PaymentContext } from "../../context/Payment/PaymentContext";
import './Payment.css';

export const Payment = () => {
  const { getAllPayments, paymentState } = useContext(PaymentContext);
  const { payments } = paymentState;

  useEffect(() => {
    if (payments.length === 0) {
        getAllPayments();
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="section-header">
          <h2>Aranceles</h2>
        </div>
      </div>
      <div className="center-center fs-4">
        <div className="d-flex flex-wrap center-center">
          {payments.length > 0 ? (
            payments.map((payment, i) => (
              <div key={i} className="information-card">
                <div className="d-flex justify-content-start">
                  <i
                    className="fa-solid fa-sack-dollar mt-2"
                    style={{ color: "#2864f6" }}
                  ></i>
                  <p className="m-0 ms-2 fw-bold areaTitle">{payment.name}</p>
                </div>
                <div className="d-flex justify-content-start flex-column mt-3">
                  <p>Formas de pago: Contado / Transferencia</p>
                  <p>Moneda: Pesos Argentinos / USD</p>
                  <p>Valores: $10.000 / U$D 20 </p>
                  <p>CBU: 123456789987654321</p>
                  <p>Fecha: Hasta 25/09/23</p>
                </div>
              </div>
            ))
          ) : (
            <div className="information-card center-center">
              Este evento no requiere pago de aranceles
            </div>
          )}
        </div>
      </div>
    </>
  );
};
