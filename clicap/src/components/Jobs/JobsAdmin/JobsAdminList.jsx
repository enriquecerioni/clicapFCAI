import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { downloadFile, getDataUserByKey } from "../../../helpers/helpers";
import { JobContext } from "../../../context/Job/JobContext";
import { UserContext } from "../../../context/User/UserContext";
import { ClicapTooltip } from "../../ClicapTooltip/ClicapTooltip";

export const JobsAdminList = ({
  work,
  showAlert,
  setJobToDelete,
  setShowAssignEvaluatorModal,
  setJobToAssignEvaluator,
}) => {
  const navigate = useNavigate();
  const roleId = getDataUserByKey("roleId");
  const userId = getDataUserByKey("id");
  const isEvaluator = roleId === 2 ? true : false;

  const { checkCorrection } = useContext(JobContext);

  const { getAllEvaluators, userState } = useContext(UserContext);
  const { evaluators } = userState;

  const [haveCorrection, setHaveCorrection] = useState(false);

  /*  const startDate = work.startDate.split('-') */
  const deleteJob = () => {
    showAlert(true);
    setJobToDelete({
      id: work.id,
      entityName: work.name,
      entityType: "job",
      navigate: "/jobs",
      job: work.urlFile,
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
    if (evaluators.length === 0) {
      getAllEvaluators();
    }
    checkToCorrection();
  }, []);

  return (
    <>
      <tr>
        <td>{work.author.name + " " + work.author.surname}</td>
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
        <td>{work.jobmodality.name}</td>
        <td>{work.jobStatus ? work.jobStatus.name : null}</td>
        {roleId === 1 ? (
          <>
            <ClicapTooltip
              tooltip={work.approve === 1 ? false : true}
              text={"No hay evaluaciones"}
            >
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => navigate(`/job/correctionstosend/${work.id}`)}
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
                  className="icon-size-table fa-solid fa-user-tie"
                  onClick={addEvaluatorWithModal}
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
                tooltip={haveCorrection === 0 ? false : true}
                text={"El trabajo ya fue evaluado"}
              >
                <div>
                  <Button
                    className="btn btn-success"
                    onClick={() => navigate(`/job/corrections/${work.id}`)}
                    disabled={haveCorrection === 0 ? false : true}
                  >
                    Evaluar
                  </Button>
                </div>
              </ClicapTooltip>
            </td>
            <td>
              <Button
                variant="primary"
                onClick={() => downloadFile(work.urlFile, "documents")}
              >
                Descargar Ult. Version
              </Button>
            </td>
          </>
        ) : null}
      </tr>
    </>
  );
};
