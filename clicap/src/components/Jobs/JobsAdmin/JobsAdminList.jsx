import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import Select from "react-select";
import { useEffect } from "react";
import {
  getDataUserByKey,
  reqAxios,
  waitAndRefresh,
} from "../../../helpers/helpers";
import { EntitiesContext } from "../../../context/EntitiesContext";
import { alertError } from "../../../helpers/alerts";

export const JobsAdminList = ({ work, showAlert, setJobToDelete }) => {
  const navigate = useNavigate();
  const roleId = getDataUserByKey("roleId");
  const userId = getDataUserByKey("id");
  const {
    job,
    setJob,
    getAllJobs,
    allJobs,
    allEvaluatorsSelector,
    getAllEvaluators,
  } = useContext(EntitiesContext);
  console.log(allJobs);
  const [assignEvaluator, setAssignEvaluator] = useState(false);
  const [haveCorrection, setHaveCorrection] = useState(false);

  /*  const startDate = work.startDate.split('-') */
  const deleteJob = () => {
    showAlert(true);
    setJobToDelete({
      id: work.id,
      entityName: work.name,
      entityType: "jobs",
      job: work.urlFile
    });
  };

  const [saveEvaluators, setsaveEvaluators] = useState([]);
  const [evaluatorsOptions1, setEvaluatorOptions1] = useState([]);
  const [evaluatorsOptions2, setEvaluatorOptions2] = useState([]);
  const [evaluatorSelected1, setEvaluatorSelected1] = useState("");
  const [evaluatorSelected2, setEvaluatorSelected2] = useState("");

  const handleSubmit = () => {};
  /*   const getAllEvaluators = async () => {
    const allEvaluators = await reqAxios(
      "GET",
      "/user/getallevaluators",
      "",
      ""
    );
    let arrayMod = allEvaluators.data.response;
    arrayMod.map((item, i) => {
      arrayMod[i].target = { value: item.value };
    });

    setEvaluatorOptions1(arrayMod);
    setEvaluatorOptions2(arrayMod);
  }; */

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

  const setEvaluatorsOptions = () => {
    setEvaluatorOptions1(allEvaluatorsSelector);
    setEvaluatorOptions2(allEvaluatorsSelector);
  };
  const addEvaluators = async (id) => {
    if (evaluatorSelected1 === evaluatorSelected2) {
      return alertError("No se puede asignar el mismo evaluador!");
    }
    const jobSelected = allJobs.find((item) => item.id === id);
    const jobEdited = {
      ...jobSelected,
      evaluatorId1: evaluatorSelected1 !== "" ? evaluatorSelected1 : "",
      evaluatorId2: evaluatorSelected2 !== "" ? evaluatorSelected2 : "",
    };

    await reqAxios("PUT", `/job/edit/${jobSelected.id}`, "", jobEdited);
    waitAndRefresh(`/jobs`, 1000);
  };

  const checkCorrection = async () => {
    const check = await reqAxios(
      "get",
      `/jobdetails/check/${work.id}/${userId}`,
      "",
      ""
    );
    setHaveCorrection(check.data.value);
  };
  useEffect(() => {
    getAllEvaluators();
    checkCorrection();
  }, []);

  useEffect(() => {
    setEvaluatorsOptions();
    setEvaluatorSelected1(work.evaluatorId1);
    setEvaluatorSelected2(work.evaluatorId2);
  }, [allEvaluatorsSelector]);

  return (
    <>
      <tr>
        <td>{work.author.name}</td>
        <td>{work.name}</td>
        <td>
          {" "}
          {assignEvaluator ? (
            <div style={{ width: "175px" }} className="">
              <Select
                options={evaluatorsOptions1.filter(
                  (el) => el.value !== evaluatorSelected2
                )}
                value={evaluatorsOptions1.filter(
                  (el) => el.value === evaluatorSelected1
                )}
                placeholder={"seleccione.."}
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
          ) : work.evaluator1 ? (
            work.evaluator1.name + " " + work.evaluator1.surname
          ) : (
            ""
          )}
        </td>
        <td>
          {" "}
          {assignEvaluator ? (
            <div style={{ width: "175px" }} className="">
              <Select
                options={evaluatorsOptions2.filter(
                  (el) => el.value !== evaluatorSelected1
                )}
                value={evaluatorsOptions2.filter(
                  (el) => el.value === evaluatorSelected2
                )}
                placeholder={"seleccione.."}
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
          ) : work.evaluator2 ? (
            work.evaluator2.name + " " + work.evaluator2.surname
          ) : (
            ""
          )}
        </td>
        <td>{work.area.name}</td>
        <td>{work.jobmodality.name}</td>
        <td>{work.jobStatus ? work.jobStatus.name : null}</td>
        {roleId === 1 ? (
          <>
            <td>
              {assignEvaluator ? (
                <Button
                  className="btn btn-danger"
                  onClick={() => setAssignEvaluator(!assignEvaluator)}
                >
                  <i className="fa-solid fa-xmark"></i>
                </Button>
              ) : (
                <i
                  type="button"
                  className="fa-solid fa-trash-can icon-size-table btn-delete-table"
                  onClick={deleteJob}
                ></i>
              )}
            </td>
            <td className="">
              {assignEvaluator ? (
                <Button
                  className="btn btn-success"
                  onClick={() => addEvaluators(work.id)}
                >
                  <i className="fa-solid fa-check"></i>
                </Button>
              ) : (
                <i
                  type="button"
                  className="fa-solid fa-pen-to-square icon-size-table btn-edit-table"
                  onClick={() => navigate(`/works/edit/${work.id}`)}
                ></i>
              )}
            </td>
            <td>
              {!assignEvaluator ? (
                <OverlayTrigger
                  placement={"top"}
                  overlay={<Tooltip>Asignar evaluador</Tooltip>}
                >
                  <i
                    type="button"
                    className="icon-size-table fa-solid fa-user-tie"
                    onClick={() => setAssignEvaluator(!assignEvaluator)}
                  ></i>
                </OverlayTrigger>
              ) : null}
            </td>
            <td>
              <Button
                className="btn btn-success"
                onClick={() => navigate(`/job/correctionstosend/${work.id}`)}
                disabled={work.approve === 1 ? false : true}
              >
                Evaluaciones
              </Button>
            </td>
          </>
        ) : (
          <td>
            <Button
              className="btn btn-success"
              onClick={() => navigate(`/job/corrections/${work.id}`)}
              disabled={haveCorrection !== 0 ? true : false}
            >
              Corregir
            </Button>
          </td>
        )}
      </tr>
    </>
  );
};
