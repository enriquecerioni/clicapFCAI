import React from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";

export const PaysAdminList = ({ pay, users, showAlert, setPayToDelete }) => {
  const navigate = useNavigate();
  /*  const startDate = work.startDate.split('-') */
  const user = users.find((user) => user.id === pay.authorId).name
  const deleteJob = () => {
    showAlert(true);
    setPayToDelete({
      id: pay.id,
      entityName: 'el pago de ' + user,
      entityType: "pay",
    });
  };
  return (
    <>
      <tr>
        <td>{users.find((user) => user.id === pay.authorId).name}</td>
        <td>{pay.cuitCuil}</td>
        <td>{pay.iva}</td>
        <td>{pay.amount + ' ' + pay.moneyType}</td>
        <td>{pay.payType}</td>
        <td>{pay.detail}</td>
        
        {/* <td>{`${startDate[2]}-${startDate[1]}-${startDate[0]}`}</td> */}
        {/* <td>{work.endDate ? `${work.endDate.split('-')[2]}-${work.endDate.split('-')[1]}-${work.endDate.split('-')[0]}` : '-'}</td> */}
        {/* <td className="">
          <i
            type="button"
            className="fa-solid fa-pen-to-square icon-size-table btn-edit-table"
            onClick={() => navigate(`/pay/edit/${pay.id}`)}
          ></i>
        </td> */}
        <td>
          <i
            type="button"
            className="fa-solid fa-trash-can icon-size-table btn-delete-table"
            onClick={deleteJob}
          ></i>
        </td>
        <td>
          {
            pay.invoice ? 
            <Button
              className="btn btn-success"
            >
              Facturado
            </Button>
            :
            (<Button
            className="btn btn-primary"
            onClick={() => navigate(`/pay/edit/${pay.id}`)}
          >
            Subir Factura
          </Button>)
          }
        </td>
      </tr>
    </>
  );
};