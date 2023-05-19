import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { CertificateContext } from "../../context/Certificate/CertificateContext";

export const UsersList = ({
  user,
  setUserToDelete,
  showAlert,
  showModalCertificate,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const { setUserIdToCertificate } = useContext(CertificateContext);
  /*  const startDate = user.startDate.split('-') */

  const deleteUser = () => {
    showAlert(true);
    setUserToDelete({
      id: user.id,
      entityName: user.name,
      entityType: "user",
      navigate: pathname,
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

        <td>
          <OverlayTrigger
            placement={"top"}
            overlay={<Tooltip>Generar certificado</Tooltip>}
          >
            <i
              type="button"
              className="fa-solid fa-id-card icon-size-table btn-certificate-table"
              onClick={() => {
                setUserIdToCertificate(user.id, user.name, user.surname);
                showModalCertificate(true);
              }}
            ></i>
          </OverlayTrigger>
        </td>

        <td className="">
          <OverlayTrigger
            placement={"top"}
            overlay={<Tooltip>Editar usuario</Tooltip>}
          >
            <i
              type="button"
              className="color-icon-edit fa-solid fa-pen-to-square icon-size-table btn-edit-table"
              onClick={() => navigate(`/user/edit/${user.id}`)}
            ></i>
          </OverlayTrigger>
        </td>

        <td>
          <OverlayTrigger
            placement={"top"}
            overlay={<Tooltip>Eliminar usuario</Tooltip>}
          >
            <i
              type="button"
              className="fa-solid fa-trash-can color-icon-error icon-size-table btn-delete-table"
              onClick={deleteUser}
            ></i>
          </OverlayTrigger>
        </td>
      </tr>
    </>
  );
};
