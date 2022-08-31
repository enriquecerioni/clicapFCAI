import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import Select from "react-select";
import { useEffect } from "react";
import { reqAxios } from "../../../helpers/helpers";
import { EntitiesContext } from "../../../context/EntitiesContext";

export const JobsAdminList = ({ work, users, showAlert, setJobToDelete }) => {
  const navigate = useNavigate();
  const { job, setJob, getAllJobs, allJobs } = useContext(EntitiesContext);
  const [assignEvaluator, setAssignEvaluator] = useState(false);

  /*  const startDate = work.startDate.split('-') */
  const deleteJob = () => {
    showAlert(true);
    setJobToDelete({
      id: work.id,
      entityName: work.name,
      entityType: "job",
    });
  };

  const [saveEvaluators, setsaveEvaluators] = useState([]);
  const [evaluatorsOptions1, setEvaluatorOptions1] = useState([]);
  const [evaluatorsOptions2, setEvaluatorOptions2] = useState([]);
  const [evaluatorSelected1, setEvaluatorSelected1] = useState("");
  const [evaluatorSelected2, setEvaluatorSelected2] = useState("");

  const evaluatorsOptions = [
    {
      value: 1,
      label: "Ivan Castro",
      target: { name: "evaluator1", value: 1 },
    },
    {
      value: 2,
      label: "Enrique Cerioni",
      target: { name: "evaluator1", value: 2 },
    },
    {
      value: 3,
      label: "Gaston Rodiguez",
      target: { name: "evaluator1", value: 3 },
    },
  ];
  const evaluators2Options = [
    {
      value: 1,
      label: "Ivan Castro",
      target: { name: "evaluator2", value: 1 },
    },
    {
      value: 2,
      label: "Enrique Cerioni",
      target: { name: "evaluator2", value: 2 },
    },
    {
      value: 3,
      label: "Gaston Rodiguez",
      target: { name: "evaluator2", value: 3 },
    },
  ];

  const handleSubmit = () => {};
  const getAllEvaluators = async () => {
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
  };

  const handleChangeEvaluator = (e, name) => {
    if (name === "evaluator1") {
      setEvaluatorSelected1(e.target.value);
    } else {
      setEvaluatorSelected2(e.target.value);
    }
  };

  const addEvaluators = async (id) => {
    const jobSelected = allJobs.find((item) => item.id === id);
    const jobEdited = {
      name: jobSelected.name,
      jobModalityId: jobSelected.jobModalityId,
      areaId: jobSelected.areaId,
      authorId: jobSelected.authorId,
      members: jobSelected.members,
      urlFile: jobSelected.urlFile,
      evaluatorId1: evaluatorSelected1,
      evaluatorId2: evaluatorSelected2,
    };
    const editJob = await reqAxios(
      "PUT",
      `/job//edit/${jobSelected.id}`,
      "",
      jobEdited
    );
  };
  useEffect(() => {
    getAllEvaluators();
    console.log(job);
  }, []);
  return (
    <>
      <tr>
        <td>{users.find((user) => user.id === work.authorId).name}</td>
        <td>{work.name}</td>
        <td>
          {" "}
          {assignEvaluator ? (
            <div style={{ width: "175px" }} className="">
              <Select
                options={evaluatorsOptions1}
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
          ) : null}
        </td>
        <td>
          {" "}
          {assignEvaluator ? (
            <div style={{ width: "175px" }} className="">
              <Select
                options={evaluatorsOptions2}
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
          ) : null}
        </td>
        <td>{work.area.name}</td>
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
            <i
              type="button"
              className="icon-size-table fa-solid fa-user-tie"
              onClick={() => setAssignEvaluator(!assignEvaluator)}
            ></i>
          ) : null}
        </td>
        <td>
          <Button
            className="btn btn-success"
            onClick={() => navigate("/customers/create")}
          >
            Aprobar
          </Button>
        </td>
      </tr>
    </>
  );
};
