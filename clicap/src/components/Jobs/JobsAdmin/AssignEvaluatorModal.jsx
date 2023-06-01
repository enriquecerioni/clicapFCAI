import React, { useContext, useEffect, useState } from "react";
import { CustomModal } from "../../CustomModal/CustomModal";
import { UserContext } from "../../../context/User/UserContext";
import Select from "react-select";
import { JobContext } from "../../../context/Job/JobContext";
import { alertError } from "../../../helpers/alerts";
import { reqAxios, waitAndRefresh } from "../../../helpers/helpers";

export const AssignEvaluatorModal = ({ showModal, setShowModal, job }) => {
  const { userState } = useContext(UserContext);
  const { evaluatorsSelector } = userState;

  const { jobState, addEvaluatorsToJob } = useContext(JobContext);
  const { jobs } = jobState;

  const [evaluatorsOptions1, setEvaluatorOptions1] = useState([]);
  const [evaluatorsOptions2, setEvaluatorOptions2] = useState([]);
  const [evaluatorSelected1, setEvaluatorSelected1] = useState("");
  const [evaluatorSelected2, setEvaluatorSelected2] = useState("");

  const setEvaluatorsOptions = () => {
    setEvaluatorOptions1(evaluatorsSelector);
    setEvaluatorOptions2(evaluatorsSelector);
  };

  const handleChangeEvaluator = (e, name) => {
    if (e) {
      if (name === "evaluator1") {
        return setEvaluatorSelected1(e.target.value);
      } else {
        return setEvaluatorSelected2(e.target.value);
      }
    }
    if (name === "evaluator1") {
      setEvaluatorSelected1("");
    } else {
      setEvaluatorSelected2("");
    }
  };

  const addEvaluators = async (id) => {
    if (evaluatorSelected1 === evaluatorSelected2) {
      return alertError("No se puede asignar el mismo evaluador!");
    }
    const jobSelected = jobs.find((item) => item.id === id);
    const jobEdited = {
      ...jobSelected,
      evaluatorId1: evaluatorSelected1 !== "" ? evaluatorSelected1 : "",
      evaluatorId2: evaluatorSelected2 !== "" ? evaluatorSelected2 : "",
      addEvaluators: true,
    };
    await addEvaluatorsToJob(jobSelected.id, jobEdited);
    setShowModal(!showModal);
  };

  useEffect(() => {
    setEvaluatorsOptions();
    setEvaluatorSelected1(job.evaluatorId1);
    setEvaluatorSelected2(job.evaluatorId2);
  }, [evaluatorsSelector]);

  return (
    <CustomModal
      showModal={showModal}
      setShowModal={setShowModal}
      title={`Asignar evaluadores`}
    >
      <>
        <div className="d-flex">
          <div className="d-flex">
            <p className="m-0 fw-bold">Autor: &nbsp;</p>
            <p className="m-0">{job.author.name + " " + job.author.surname}</p>
          </div>
          <div className="ms-3 d-flex">
            <p className="m-0 fw-bold">Trabajo: &nbsp;</p>
            <p className="m-0">{job.name}</p>
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-around mt-3">
          <div style={{ width: "250px" }} className="">
            <label htmlFor="forName" className="form-label label-filters">
              Evaluador 1
            </label>
            <Select
              options={evaluatorsOptions1.filter(
                (el) => el.value !== evaluatorSelected2
              )}
              value={evaluatorsOptions1.filter(
                (el) => el.value === evaluatorSelected1
              )}
              placeholder={"Seleccione..."}
              name="evaluator1"
              isClearable={true}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: "#3D84A8",
                },
              })}
              onChange={(e) => handleChangeEvaluator(e, "evaluator1")}
            />
          </div>

          <div style={{ width: "250px" }} className="">
            <label htmlFor="forName" className="form-label label-filters">
              Evaluador 2
            </label>
            <Select
              options={evaluatorsOptions2.filter(
                (el) => el.value !== evaluatorSelected1
              )}
              value={evaluatorsOptions2.filter(
                (el) => el.value === evaluatorSelected2
              )}
              placeholder={"Seleccione..."}
              name="evaluator2"
              isClearable={true}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: "#3D84A8",
                },
              })}
              onChange={(e) => handleChangeEvaluator(e, "evaluator2")}
            />
          </div>
        </div>
        <div className="center-center mt-3">
          <button
            className="btn btn-primary"
            onClick={() => addEvaluators(job.id)}
          >
            Asignar
          </button>
        </div>
      </>
    </CustomModal>
  );
};
