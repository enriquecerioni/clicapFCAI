import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "../jobs.css";
import { useNavigate } from "react-router";
//components
import { useContext } from "react";
import { Loader } from "../../Loader/Loader";
import { JobContext } from "../../../context/Job/JobContext";
import JobVersionList from "./JobVersionList"
import { ClicapTooltip } from "../../ClicapTooltip/ClicapTooltip";
import { getDataUserByKey } from "../../../helpers/helpers";

const JobVersion = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { jobState, validateIsOwnJob, getJobVersionsById } = useContext(JobContext);
  const { isFetching, jobVersions, isOwnJob } = jobState;
  const latestJobVersion = jobVersions[jobVersions.length - 1];
  const roleId = getDataUserByKey("roleId");
  const userId = getDataUserByKey("id");
  const jobId = latestJobVersion?.jobId;
  const getTextTooltip =
    latestJobVersion?.job?.status === null
      ? "Solo puede presentar un trabajo si tiene alguna corrección"
      : "Subir nueva versión del trabajo";

  useEffect(() => {
    validateIsOwnJob(jobId, userId)
    getJobVersionsById(Number(id));
  }, [jobId, userId])

  return (
    <div className="ms-3 me-3">
      <h2 className="text-center">Versiones</h2>
      <h3 className="text-center">{latestJobVersion?.job.name}</h3>
      {
        roleId !== 1 && isOwnJob ? (
          <div className="box-add-instance">
            <ClicapTooltip tooltip={true} text={getTextTooltip}>
              <div className="text-end align-uploadjob-button">
                <button
                  className="btn btn-primary"
                  disabled={
                    latestJobVersion?.status === null || ["Aceptado"].includes(latestJobVersion?.status)
                      ? true
                      : false
                  }
                  onClick={() => navigate(`/myjob/${latestJobVersion?.jobId}`)}
                >
                  <h5 className="">Subir nueva versión <i className="fa-solid fa-file-arrow-up"></i></h5>
                </button>
              </div>
            </ClicapTooltip>
          </div>
        ) : null
      }

      <div className="mt-3 overflow-x">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>N° de versión</th>
              <th>Estado</th>
              <th>Correción</th>
              <th>Fecha de correción</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {jobVersions &&
              jobVersions.map((version, i) => <JobVersionList version={version} key={version.id} />)}
          </tbody>
        </table>
      </div>

      {isFetching ? (
        <div className="center-center">
          <Loader />
        </div>
      ) : null}
    </div>
  );
};
export default JobVersion;
