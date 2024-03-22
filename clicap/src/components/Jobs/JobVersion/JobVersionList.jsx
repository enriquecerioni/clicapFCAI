import React from "react";
import { downloadFile, formatDate } from "../../../helpers/helpers";
import { ClicapTooltip } from "../../ClicapTooltip/ClicapTooltip";

const JobStudentVersionList = ({ version }) => {

    const jobStatus = version.status ? version.status : 'Esperando correción';
    const currentVersionDate = version.correctionDate;
    const formatedDate = formatDate(currentVersionDate)

    return (
        <tr>
            <td>{version.versionNumber}</td>
            <td>{jobStatus}</td>
            <td>{version.feedback ? version.feedback : 'Esperando corrección'}</td>
            <td>{formatedDate}</td>
            <td className="text-center">
                <ClicapTooltip tooltip={true} text={"Descargar versión"}>
                    <button
                        className="btn btn-secondary"
                        disabled={jobStatus === null ? true : false}
                    >
                        <i
                            className="icon-size-table fa-solid fa-file-arrow-down"
                            type="button"
                            onClick={() => downloadFile(version.urlFile, "documents")}
                        ></i>
                    </button>
                </ClicapTooltip>
            </td>
        </tr>
    );
};
export default JobStudentVersionList;
