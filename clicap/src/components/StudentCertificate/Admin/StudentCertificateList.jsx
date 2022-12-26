import React from "react";
import { Button } from "react-bootstrap";
import { downloadFile } from "../../../helpers/helpers";

export const StudentCertificateList = ({ regularCertificate, showAlert, setCertificateToDelete }) => {

    const deleteRegularCertificate = () => {
        showAlert(true);
        setCertificateToDelete({
            id: regularCertificate.id,
            entityName: "certificado de " + regularCertificate.user.name,
            entityType: "regular-certificates",
            navigate: "/certificates",
            certificate: regularCertificate.urlFile
        });
    };

    return (
        <>
            <tr>
                <td>{regularCertificate.user.name + " " + regularCertificate.user.surname}</td>
                <td>{regularCertificate.detail}</td>
                <td>
                    <Button
                        className="btn btn-info"
                        onClick={() =>
                            downloadFile(
                                regularCertificate.urlFile,
                                "regularcertificates"
                            )
                        }
                    >
                        <i className="fa-solid fa-file-arrow-down icon-size-table"></i>
                    </Button>
                </td>
                <td>
                    <i
                        type="button"
                        className="fa-solid fa-trash-can icon-size-table btn-delete-table"
                        onClick={deleteRegularCertificate}
                    ></i>
                </td>
            </tr>
        </>
    );
};

