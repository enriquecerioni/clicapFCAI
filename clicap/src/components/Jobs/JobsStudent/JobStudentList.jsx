import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { JobContext } from "../../../context/Job/JobContext";
import { ClicapTooltip } from "../../ClicapTooltip/ClicapTooltip";

const JobStudentList = ({ job }) => {
  const navigate = useNavigate();
  const { getJobVersionsById } = useContext(JobContext);

  useEffect(() => {
    getJobVersionsById(job.id);
  }, [])

  const jobStatus = job.jobStatus ? job.jobStatus.name : 'Esperando correción';

  return (
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
  );
};
export default JobStudentList;
