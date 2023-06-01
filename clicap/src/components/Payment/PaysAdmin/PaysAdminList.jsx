import React from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import { downloadFile } from "../../../helpers/helpers";

export const PaysAdminList = ({ pay, users, showAlert, setPayToDelete }) => {
  const navigate = useNavigate();
  /*  const startDate = work.startDate.split('-') */
  const userName =
    users.length > 0
      ? users.find((user) => user.id === pay.authorId).name
      : "-";

  const deletePay = () => {
    showAlert(true);
    setPayToDelete({
      id: pay.id,
      entityName: "el pago de " + userName,
      entityType: "pay",
      receipt: pay.urlFile,
      invoice: pay.invoice,
      navigate: "/pays",
    });
  };
  return (
    <>
      <tr>
        <td>{userName}</td>
        <td>{pay.cuitCuil}</td>
        <td>{pay.iva}</td>
        <td>{pay.amount + " " + pay.moneyType}</td>
        <td>{pay.payType}</td>
        <td>{pay.detail}</td>
        <td>
          <i
            type="button"
            className="fa-solid fa-trash-can icon-size-table btn-delete-table color-icon-error"
            onClick={deletePay}
          ></i>
        </td>

        <td>
          {pay.invoice ? (
            <Button
              className="btn btn-success"
              onClick={() => downloadFile(pay.invoice, "invoices")}
            >
              Descargar Factura <i className="fa-solid fa-download"></i>
            </Button>
          ) : (
            <Button
              className="btn btn-primary"
              onClick={() => navigate(`/pay/edit/${pay.id}`)}
            >
              Subir Factura <i className="fa-solid fa-upload"></i>
            </Button>
          )}
        </td>

        <td>
          {pay.urlFile && (
            <Button
              className="btn btn-secondary"
              onClick={() => downloadFile(pay.urlFile, "payments")}
            >
              Comprobante de Pago <i className="fa-solid fa-download"></i>
            </Button>
          )}
        </td>
      </tr>
    </>
  );
};
