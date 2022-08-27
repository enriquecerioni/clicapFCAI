import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import Select from "react-select";

export const JobsAdminList = ({ work, users, showAlert, setJobToDelete }) => {
  const navigate = useNavigate();
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

  const initialStateEvaluators = {
    evaluator1: "",
    evaluator2: "",
  };
  const [evaluators, setEvaluators] = useState(initialStateEvaluators);

  const handleChangeEvaluators = (e, name) => {
    if (e) {
      setEvaluators({
        ...evaluators,
        [e.target.name]: e.target.value,
      });
    } else {
      setEvaluators({
        ...evaluators,
        [name]: "",
      });
    }
  };
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

  const handleSubmit=()=>{

  }
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
                options={evaluatorsOptions}
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
                onChange={(e) => handleChangeEvaluators(e, "evaluator1")}
              />
            </div>
          ) : null}
        </td>
        <td>
          {" "}
          {assignEvaluator ? (
            <div style={{ width: "175px" }} className="">
              <Select
                options={evaluators2Options}
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
                onChange={(e) => handleChangeEvaluators(e, "evaluator2")}
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
              onClick={handleSubmit}
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
          <i
            type="button"
            className="icon-size-table fa-solid fa-user-tie"
            onClick={() => setAssignEvaluator(!assignEvaluator)}
          ></i>
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
