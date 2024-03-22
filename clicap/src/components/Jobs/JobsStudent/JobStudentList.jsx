import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import { CorrectionModal } from "../Corrections/CorrectionModal";
import { downloadFile } from "../../../helpers/helpers";
import { JobContext } from "../../../context/Job/JobContext";
import { ClicapTooltip } from "../../ClicapTooltip/ClicapTooltip";

const JobStudentList = ({ job, setjobToDelete }) => {
  const navigate = useNavigate();
  const [showCorrecModal, setCorrecModal] = useState(false);

  const { getCorrectionByJob, getJobVersionsById } = useContext(JobContext);

  const [correction, setCorrection] = useState({});

  const getCorrection = async () => {
    const correct = await getCorrectionByJob(job.id, job.correctionNumber);
    setCorrection(correct);
    setCorrecModal(true);
  };

  useEffect(() => {
    getJobVersionsById(job.id);
  },[])

  const jobStatus = job.jobStatus ? job.jobStatus.name : 'Esperando correción';
  const getTextTooltip =
    job.status === null
      ? "Solo puede presentar un trabajo si tiene alguna corrección"
      : "Subir nueva versión del trabajo";

  return (
    <>
      {showCorrecModal ? (
        <CorrectionModal
          jobName={job.name}
          correction={correction}
          showModal={setCorrecModal}
        />
      ) : null}
      <tr>
        <td>{job.name}</td>
        <td>{job.area.name}</td>
        <td>{job.jobmodality.title}</td>
        <td>{jobStatus}</td>
        <ClicapTooltip
          tooltip={job.status === null ? true : false}
          text={"No hay correcciones aún"}
        >
          <td className="text-center">
            <button
              className="btn btn-success"
              onClick={() => navigate(`/job/versions/${job.id}`)}
            >
              Ver entregas
            </button>
          </td>
        </ClicapTooltip>
       
      </tr>
    </>
  );
};
export default JobStudentList;
