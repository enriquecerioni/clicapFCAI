import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { CertificateContext } from "../../context/Certificate/CertificateContext";
import { ClicapTooltip } from "../ClicapTooltip/ClicapTooltip";

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
      <tr>
        <td>{user.name + " " + user.surname}</td>
        <td>{user.identifyNumber}</td>
        <td>{user.email}</td>
        <td>{user.role.name}</td>

        {location.pathname !== "/users" ? (
          <td>
            <ClicapTooltip tooltip={true} text={"Generar certificado"}>
              <i
                type="button"
                className="fa-solid fa-id-card icon-size-table btn-certificate-table"
                onClick={() => {
                  setUserIdToCertificate(user);
                  showModalCertificate(true);
                }}
              ></i>
            </ClicapTooltip>
          </td>
        ) : null}

        <td className="">
          <ClicapTooltip tooltip={true} text={"Editar usuario"}>
            <i
              type="button"
              className="color-icon-edit fa-solid fa-pen-to-square icon-size-table btn-edit-table"
              onClick={() => navigate(`/user/edit/${user.id}`)}
            ></i>
          </ClicapTooltip>
        </td>

        <td>
          <ClicapTooltip tooltip={true} text={"Eliminar usuario"}>
            <i
              type="button"
              className="fa-solid fa-trash-can color-icon-error icon-size-table btn-delete-table"
              onClick={deleteUser}
            ></i>
          </ClicapTooltip>
        </td>
      </tr>
    </>
  );
};
