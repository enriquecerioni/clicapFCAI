import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import Select from "react-select";
import { useEffect } from "react";
import {
    downloadFile,
    getDataUserByKey,
    reqAxios,
    waitAndRefresh,
} from "../../../helpers/helpers";
import { EntitiesContext } from "../../../context/EntitiesContext";
import { alertError } from "../../../helpers/alerts";

export const StudentCertificateList = ({ regularCertificate, showAlert, setCertificateToDelete }) => {
    const navigate = useNavigate();
    const roleId = getDataUserByKey("roleId");
    const userId = getDataUserByKey("id");
    const {
        corrections,
        allJobs,
        allEvaluatorsSelector,
        getAllEvaluators,
        getCorrectionsByJob,
    } = useContext(EntitiesContext);
    console.log(allJobs);
    const [assignEvaluator, setAssignEvaluator] = useState(false);
    const [haveCorrection, setHaveCorrection] = useState(false);

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

    useEffect(() => {
        getCorrectionsByJob();
        getAllEvaluators();
    }, []);

    return (
        <>
            <tr>
                {/* <td>{regularCertificate.author.name + ' ' + regularCertificate.author.surname}</td> */}
                {/* <td>{regularCertificate.name}</td> */}
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

