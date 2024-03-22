import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { downloadFile, getDataUserByKey } from "../../../helpers/helpers";
import { JobContext } from "../../../context/Job/JobContext";
import { UserContext } from "../../../context/User/UserContext";
import { ClicapTooltip } from "../../ClicapTooltip/ClicapTooltip";
import "../../../App.css";

export const JobsAdminList = ({
  work,
  showAlert,
  jobToDelete,
  setJobToDelete,
  setShowAssignEvaluatorModal,
  setJobToAssignEvaluator,
}) => {
  const navigate = useNavigate();
  const roleId = getDataUserByKey("roleId");
  const userId = getDataUserByKey("id");
  const isEvaluator = roleId === 2 ? true : false;

  const { getJobVersionsById, checkCorrection, jobState } = useContext(JobContext);
  const { jobVersions } = jobState;

  const { getAllEvaluators, userState } = useContext(UserContext);
  const { evaluators } = userState;

  const [haveCorrection, setHaveCorrection] = useState(false);
  const jobStatus = work.jobStatus ? work.jobStatus.name : 'Esperando correción';

  /*  const startDate = work.startDate.split('-') */
  const deleteJob = () => {
    showAlert(true);
    setJobToDelete({
      ...jobToDelete,
      id: work.id,
      entityName: work.name,
      entityType: "job",
      navigate: "/jobs",
      jobVersions: jobVersions,
    });
  };

  const checkToCorrection = async () => {
    const correction = await checkCorrection(
      work.id,
      userId,
      work.correctionNumber
    );
    setHaveCorrection(correction);
  };

  const addEvaluatorWithModal = () => {
    setJobToAssignEvaluator(work);
    setShowAssignEvaluatorModal(true);
  };

  useEffect(() => {
    /* getCorrectionsByJob(work.id); */
    getJobVersionsById(work.id);
    if (evaluators.length === 0) {
      getAllEvaluators();
    }
    checkToCorrection();
  }, []);

  return (
    <>
      <tr>
        <td>{work.author}</td>
        <td>{work.name}</td>
        {isEvaluator ? null : (
          <>
            <td>
              {work.evaluator1
                ? work.evaluator1.name + " " + work.evaluator1.surname
                : ""}
            </td>
            <td>
              {work.evaluator2
                ? work.evaluator2.name + " " + work.evaluator2.surname
                : ""}
            </td>
          </>
        )}
        <td>{work.area.name}</td>
        <td>{work.jobmodality.title}</td>
        <td>{jobStatus}</td>
        <td className="text-center" onClick={() => navigate(`/job/versions/${work.id}`)}>
          <ClicapTooltip tooltip={true} text={"Visualizar versiones de entregas"}>
            <button
              className="btn btn-secondary"
            >
              <i
                className="icon-size-table fa-solid fa-file-arrow-down"
                type="button"
              ></i>
            </button>
          </ClicapTooltip>
        </td>
        {roleId === 1 ? (
          <>
            <ClicapTooltip
              tooltip={work.approve === 1 ? false : true}
              text={"No hay evaluaciones"}
            >
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => navigate(`/job/correctionstosend/${work.id}/${work.correctionNumber}`)}
                  disabled={work.approve === 1 ? false : true}
                >
                  Evaluaciones
                </button>
              </td>
            </ClicapTooltip>

            <td>
              <ClicapTooltip tooltip={true} text={"Asignar evaluador"}>
                <i
                  type="button"
                  className={`${work.status === 1 ? 'icon-size-table fa-solid fa-user-tie fa-disabled' : 'icon-size-table fa-solid fa-user-tie'}`}
                  onClick={work.status === 1 ? null : addEvaluatorWithModal}
                ></i>
              </ClicapTooltip>
            </td>

            <td className="">
              <ClicapTooltip tooltip={true} text={"Editar Trabajo"}>
                <i
                  type="button"
                  className="color-icon-edit fa-solid fa-pen-to-square icon-size-table btn-edit-table"
                  onClick={() => navigate(`/jobs/job/edit/${work.id}`)}
                ></i>
              </ClicapTooltip>
            </td>

            <td>
              <ClicapTooltip tooltip={true} text={"Eliminar trabajo"}>
                <i
                  type="button"
                  className="fa-solid fa-trash-can icon-size-table btn-delete-table color-icon-error"
                  onClick={deleteJob}
                ></i>
              </ClicapTooltip>
            </td>
          </>
        ) : isEvaluator ? (
          <>
            <td>
              <ClicapTooltip
                tooltip={
                  work.status === null
                    ? haveCorrection === 0
                      ? false
                      : true
                    : true
                }
                text={"El trabajo ya fue evaluado"}
              >
                <div>
                  <Button
                    className="btn btn-success"
                    onClick={() => navigate(`/job/corrections/${work.id}`)}
                    disabled={
                      work.status === null
                        ? haveCorrection === 0
                          ? false
                          : true
                        : true
                    }
                  >
                    Evaluar
                  </Button>
                </div>
              </ClicapTooltip>
            </td>
            {/* <td>
              <Button
                variant="primary"
                onClick={() => downloadFile(work.urlFile, "documents")}
              >
                Descargar Ult. Version
              </Button>
            </td> */}
          </>
        ) : null}
      </tr>
    </>
  );
};
