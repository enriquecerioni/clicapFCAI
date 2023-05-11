import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { EntitiesContext } from "../../../context/EntitiesContext";
import Select from "react-select";
import { getDataUserByKey } from "../../../helpers/helpers";
import "./jobsFilters.css";

export const JobsFilters = ({ setShowModalFilters }) => {
  const roleId = getDataUserByKey("roleId");
  const {
    allJobs,
    getAllJobs,
    users,
    getAllUsers,
    getAllAreas,
    usersSelector,
    areasSelector,
    totalPages,
    allStatusJob,
    getAllEvaluators,
    allEvaluatorsSelector,
    setFiltersGlobal,
    filtersGlobal,
  } = useContext(EntitiesContext);

  const modalities = [
    {
      label: "Trabajo completo",
      value: 1,
      target: { name: "jobModalityId", value: 1 },
    },
    { label: "Resumen", value: 2, target: { name: "jobModalityId", value: 2 } },
  ];

  const toCorrectionOptions = [
    {
      value: 1,
      label: "Para corregir",
      target: { name: "approve", value: 1 },
    },
    {
      value: 0,
      label: "Corregidos",
      target: { name: "approve", value: 0 },
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    getAllJobs(1, filtersGlobal);
    setShowModalFilters(false);
  };

  const handleChangeFilter = (e, name) => {
    if (e) {
      setFiltersGlobal({
        ...filtersGlobal,
        [e.target.name]: e.target.value,
      });
    } else {
      setFiltersGlobal({
        ...filtersGlobal,
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
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Título"
                onChange={(e) => handleChangeFilter(e, "name")}
              />
            </div>
            <div className="col">
              <label htmlFor="forAuthorId" className="form-label label-filters">
                Autor
              </label>
              <Select
                options={usersSelector}
                placeholder={"seleccione.."}
                name="authorId"
                isClearable={true}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: "#3D84A8",
                  },
                })}
                onChange={(e) => handleChangeFilter(e, "authorId")}
              />
            </div>
            <div className="col">
              <label htmlFor="forArea" className="form-label label-filters">
                Area
              </label>
              <Select
                options={areasSelector}
                placeholder={"seleccione.."}
                name="areaId"
                value={areasSelector.filter(
                  (area) => filtersGlobal.areaId === area.value
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
                options={modalities}
                value={modalities.filter(
                  (mod) => filtersGlobal.jobModalityId === mod.value
                )}
                placeholder={"seleccione.."}
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
                options={allEvaluatorsSelector}
                placeholder={"seleccione.."}
                name="evaluatorId"
                isClearable={true}
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
                placeholder={"seleccione.."}
                name="status"
                isClearable={true}
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
