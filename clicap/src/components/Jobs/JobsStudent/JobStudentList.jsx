import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import { CorrectionModal } from "../Corrections/CorrectionModal";
import { downloadFile } from "../../../helpers/helpers";
import { JobContext } from "../../../context/Job/JobContext";
import { ClicapTooltip } from "../../ClicapTooltip/ClicapTooltip";

const JobStudentList = ({ job, setjobToDelete }) => {
  const navigate = useNavigate();
  const classInactive = "shadow card-inst border-b-danger";
  const classActive = "shadow card-inst border-b-success";
  const [showCorrecModal, setCorrecModal] = useState(false);

  const { getCorrectionByJob } = useContext(JobContext);

  const [correction, setCorrection] = useState({});

  const getCorrection = async () => {
    const correct = await getCorrectionByJob(job.id);
    setCorrection(correct);
    setCorrecModal(true);
  };

  const getTextTooltip = job.status === null ? 'Solo puede presentar un trabajo si tiene alguna corrección' : 'Subir nueva versión del trabajo'
    
  return (
    <>
      {showCorrecModal ? (
        <CorrectionModal
          jobName={job.name}
          description={correction.details}
          showModal={setCorrecModal}
        />
      ) : null}
      <tr>
        <td>{job.name}</td>
        <td>{job.area.name}</td>
        <td>{job.jobmodality.name}</td>
        <td>{job.jobStatus?.name}</td>
        <ClicapTooltip
          tooltip={job.status === null ? true : false}
          text={"No hay correcciones"}
        >
          <td className="text-center">
            <button
              className="btn btn-success"
              onClick={getCorrection}
              disabled={job.status === null ? true : false}
            >
              Ver Corrección
            </button>
          </td>
        </ClicapTooltip>

        <td className="text-center">
          <ClicapTooltip
            tooltip={true}
            text={getTextTooltip}
          >
            <Button
              className="btn btn-primary"
              disabled={job.status === null || job.status === 1 ? true : false}
              onClick={() => navigate(`/myjob/${job.id}`)}
            >
              <i className="fa-solid fa-file-arrow-up"></i>
            </Button>
          </ClicapTooltip>
        </td>
        <td className="text-center">
          <ClicapTooltip tooltip={true} text={"Descargar Trabajo"}>
            <button
              className="btn btn-secondary"
              /* disabled={job.status === null ? true : false} */
            >
              <i
                className="icon-size-table fa-solid fa-file-arrow-down"
                type="button"
                onClick={() => downloadFile(job.urlFile, "documents")}
              ></i>
            </button>
          </ClicapTooltip>
        </td>
      </tr>
    </>
  );
};
export default JobStudentList;
