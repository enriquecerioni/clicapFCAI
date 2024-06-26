import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import Select from "react-select";
import "./jobsFilters.css";
import { UserContext } from "../../../context/User/UserContext";
import { AreaContext } from "../../../context/Area/AreaContext";
import { JobContext } from "../../../context/Job/JobContext";
import { ModalitiesContext } from "../../../context/Modalities/ModalitiesContext";

export const JobsFilters = ({ filters, setFilters, setShowModalFilters }) => {
  const { getJobsFiltered } = useContext(JobContext);

  const { userState } = useContext(UserContext);
  const { authorSelector, evaluatorsSelector } = userState;

  const { areaState } = useContext(AreaContext);
  const { areasSelector } = areaState;

  const { modalitiesState } = useContext(ModalitiesContext);
  const { modalitiesSelector } = modalitiesState;

  const toCorrectionOptions = [
    {
      value: 3,
      label: "Para asignar evaluadores",
      target: { name: "status", value: 3 },
    },
    {
      value: 2,
      label: "Para corregir",
      target: { name: "status", value: 2,},
    },
    {
      value: 0,
      label: "Esperando correción / Esperando nueva versión",
      target: { name: "status", value: 0 },
    },
    {
      value: 1,
      label: "Aceptados",
      target: { name: "status", value: 1 },
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    getJobsFiltered(1, filters);
    setShowModalFilters(false);
  };

  const handleChangeFilter = (e, name) => {
    if (e) {
      console.log(e.target.name)
      setFilters({
        ...filters,
        [e.target.name]: e.target.value,
      });
    } else {
      setFilters({
        ...filters,
        [name]: "",
      });
    }
  };

  return (
    <div className="">
      <form method="get" className="center-center-col" onSubmit={handleSubmit}>
        <div className="pb-3 container">
          <div className="row pb-2">
            <div className="col">
              <label htmlFor="forName" className="form-label label-filters">
                Título
              </label>
              <input
                type="text"
                name="name"
                value={filters.name}
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Título"
                onChange={(e) => handleChangeFilter(e, "name")}
              />
            </div>
            <div className="col">
              <label htmlFor="forName" className="form-label label-filters">
                Autor
              </label>
              <input
                type="text"
                name="author"
                value={filters.author}
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Autor"
                onChange={(e) => handleChangeFilter(e, "author")}
              />
            </div>
            <div className="col">
              <label htmlFor="forArea" className="form-label label-filters">
                Area
              </label>
              <Select
                options={areasSelector}
                placeholder={"Seleccione..."}
                name="areaId"
                value={areasSelector.filter(
                  (area) => filters.areaId === area.value
                )}
                isClearable={true}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: "#3D84A8",
                  },
                })}
                onChange={(e) => handleChangeFilter(e, "areaId")}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label htmlFor="forArea" className="form-label label-filters">
                Modalidad
              </label>
              <Select
                options={modalitiesSelector}
                value={modalitiesSelector.filter(
                  (mod) => filters.jobModalityId === mod.value
                )}
                placeholder={"Seleccione..."}
                name="jobModalityId"
                isClearable={true}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: "#3D84A8",
                  },
                })}
                onChange={(e) => handleChangeFilter(e, "jobModalityId")}
              />
            </div>
            <div className="col">
              <label htmlFor="forArea" className="form-label label-filters">
                Evaluador
              </label>
              <Select
                options={evaluatorsSelector}
                placeholder={"Seleccione..."}
                name="evaluatorId"
                isClearable={true}
                value={evaluatorsSelector.filter(
                  (evaluator) => filters.evaluatorId === evaluator.value
                )}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: "#3D84A8",
                  },
                })}
                onChange={(e) => handleChangeFilter(e, "evaluatorId")}
              />
            </div>
            <div className="col">
              <label htmlFor="forArea" className="form-label label-filters">
                Estado
              </label>
              <Select
                options={toCorrectionOptions}
                placeholder={"Seleccione..."}
                name="status"
                isClearable={true}
                value={toCorrectionOptions.filter(
                  (status) => filters.status === status.value
                )}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: "#3D84A8",
                  },
                })}
                onChange={(e) => handleChangeFilter(e, "status")}
              />
            </div>
          </div>
        </div>
        <div className="center-center">
          <Button variant="primary" type="submit">
            Buscar
          </Button>
        </div>
      </form>
    </div>
  );
};
