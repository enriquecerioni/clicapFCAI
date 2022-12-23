import React from "react";
import { useNavigate } from "react-router";

export const CertificatesList = ({
  certificate,
  setCertificateToDelete,
  showAlert,
}) => {
  const navigate = useNavigate();
  const deleteUser = () => {
    showAlert(true);
    setCertificateToDelete({
      id: certificate.id,
      entityName: certificate.name,
      entityType: "users",
    });
  };
  return (
    <>
      <tr>
        <td>{certificate.name}</td>
        <td>{certificate.text}</td>
        <td className="">
          <i
            type="button"
            className="fa-solid fa-pen-to-square icon-size-table btn-edit-table"
            onClick={() => navigate(`/edit-certificate-type/${certificate.id}`)}
          ></i>
        </td>
        <td>
          <i
            type="button"
            className="fa-solid fa-trash-can icon-size-table btn-delete-table"
            onClick={deleteUser}
          ></i>
        </td>
      </tr>
    </>
  );
};
