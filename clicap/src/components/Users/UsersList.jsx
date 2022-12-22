import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { CertificateContext } from "../../context/Certificate/CertificateContext";

export const UsersList = ({
  user,
  setUserToDelete,
  showAlert,
  showModalCertificate,
}) => {
  const navigate = useNavigate();
  /*  const startDate = user.startDate.split('-') */
  const { setUserIdToCertificate } = useContext(CertificateContext);
  const deleteUser = () => {
    showAlert(true);
    setUserToDelete({
      id: user.id,
      entityName: user.name,
      entityType: "users",
    });
  };
  return (
    <>
      {/*   { console.log(user.name)} */}
      <tr>
        <td>{user.name + " " + user.surname}</td>
        <td>{user.identifyNumber}</td>
        <td>{user.email}</td>
        <td>{user.role.name}</td>
        <OverlayTrigger
          placement={"top"}
          overlay={<Tooltip>Editar usuario</Tooltip>}
        >
          <td className="">
            <i
              type="button"
              className="fa-solid fa-pen-to-square icon-size-table btn-edit-table"
              onClick={() => navigate(`/user/edit/${user.id}`)}
            ></i>
          </td>
        </OverlayTrigger>

        <OverlayTrigger
          placement={"top"}
          overlay={<Tooltip>Eliminar usuario</Tooltip>}
        >
          <td>
            <i
              type="button"
              className="fa-solid fa-trash-can icon-size-table btn-delete-table"
              onClick={deleteUser}
            ></i>
          </td>
        </OverlayTrigger>

        <OverlayTrigger
          placement={"top"}
          overlay={<Tooltip>Generar certificado</Tooltip>}
        >
          <td>
            <i
              type="button"
              className="fa-solid fa-id-card icon-size-table btn-certificate-table"
              onClick={() => {
                setUserIdToCertificate(user.id, user.name,user.surname);
                showModalCertificate(true);
              }}
            ></i>
          </td>
        </OverlayTrigger>
      </tr>
    </>
  );
};
