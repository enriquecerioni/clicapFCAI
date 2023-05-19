import React from "react";
import { useNavigate } from "react-router";

export const CertificatesList = ({certificate,setCertificateToDelete,showAlert}) => {
  const navigate = useNavigate();

  const deleteCertificate = () => {
    showAlert(true);
    setCertificateToDelete({
      id: certificate.id,
      entityName: certificate.name,
      entityType: "certificate",
      navigate: "/certificate-types",
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
            className="color-icon-edit fa-solid fa-pen-to-square icon-size-table btn-edit-table"
            onClick={() => navigate(`/edit-certificate-type/${certificate.id}`)}
          ></i>
        </td>
        <td>
          <i
            type="button"
            className="fa-solid fa-trash-can icon-size-table btn-delete-table color-icon-error"
            onClick={deleteCertificate}
          ></i>
        </td>
      </tr>
    </>
  );
};
