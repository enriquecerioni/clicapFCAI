import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { JobsAdminList } from "./JobsAdminList";
import ModalDelete from "../../Modals/ModalDelete";
import { EntitiesContext } from "../../../context/EntitiesContext";
import Select from "react-select";
import { PaginationCustom } from "../../Pagination/Pagination";
import { getDataUserByKey, reqAxiosDownload } from "../../../helpers/helpers";

const JobsAdmin = () => {
  const navigate = useNavigate();
  const roleId = getDataUserByKey("roleId");
  const userId = getDataUserByKey("id");
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
  /*   const initialFilters = {
    authorId: "",
    name: "",
    areaId: "",
    jobModalityId: "",
    status: "",
    evaluatorId: roleId === 2 ? userId : "",
  }; */
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
  const [filters, setFilters] = useState(filtersGlobal);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [JobToDelete, setJobToDelete] = useState(false);
  const [page, setPage] = useState(1);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    getAllJobs(1, filtersGlobal);
  };

  const exportToExcel = async () => {
    await reqAxiosDownload(`/job/export/jobs`, filtersGlobal,'Trabajos');
  };

  useEffect(() => {
    getAllUsers();
    getAllAreas();
    getAllEvaluators();
    getAllJobs(page, filtersGlobal);
  }, [page]);

  return (
    <>
      <div className="">
        <h2 className="text-center">Trabajos</h2>
        <div className="d-flex justify-content-end"></div>
        {showDeleteModal ? (
          <ModalDelete entity={JobToDelete} showAlert={setShowDeleteModal} />
        ) : null}

        {roleId === 1 ? (
          <div className=" mt-2 overflow-x">
            <form
              method="get"
              className="center-filters"
              onSubmit={handleSubmit}
            >
              <div className="me-3">
                <label htmlFor="forName" className="form-label">
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
              <div className="me-3">
                <label htmlFor="forAuthorId" className="form-label">
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
              <div className="me-3">
                <label htmlFor="forArea" className="form-label">
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
              <div className="me-3">
                <label htmlFor="forArea" className="form-label">
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
              <div className="me-3">
                <label htmlFor="forArea" className="form-label">
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
              <div className="me-3">
                <label htmlFor="forArea" className="form-label">
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
              <Button variant="primary" type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </Button>
            </form>
          </div>
        ) : null}
        {roleId === 1 ? (
          <div className="mt-2 ms-3">
            <Button variant="primary" onClick={exportToExcel}>
              Exportar
            </Button>
          </div>
        ) : null}

        {allJobs.length > 0 ? (
          <>
            <div className="mt-3 overflow-x">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Autor</th>
                    <th>Título</th>
                    <th>Evaludor 1</th>
                    <th>Evaludor 2</th>
                    <th>Area</th>
                    <th>Modalidad</th>
                    <th>Estado</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {allJobs.map((work) => (
                    <JobsAdminList
                      work={work}
                      showAlert={setShowDeleteModal}
                      setJobToDelete={setJobToDelete}
                      key={work.id}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <PaginationCustom
              currentPage={page}
              totalPages={totalPages}
              paginate={setPage}
            />
          </>
        ) : (
          <p className="mt-4 text-center">No hay Trabajos</p>
        )}
      </div>
    </>
  );
};
export default JobsAdmin;
