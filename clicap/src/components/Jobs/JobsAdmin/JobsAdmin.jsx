import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { JobsAdminList } from "./JobsAdminList";
import ModalDelete from "../../Modals/ModalDelete";
import { EntitiesContext } from "../../../context/EntitiesContext";
import Select from "react-select";
import { PaginationCustom } from "../../Pagination/Pagination";

const JobsAdmin = () => {
  const navigate = useNavigate();
  const {
    allJobs,
    getAllJobs,
    users,
    getAllUsers,
    getAllAreas,
    usersSelector,
    areasSelector,
    totalPages,
  } = useContext(EntitiesContext);

  const initialFilters = {
    authorId: "",
    name: "",
    areaId: "",
  };
  const [filters, setFilters] = useState(initialFilters);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [JobToDelete, setJobToDelete] = useState(false);
  const [page, setPage] = useState(1);

  const handleChangeFilter = (e, name) => {
    if (e) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    getAllJobs(1, filters);
  };

  useEffect(() => {
    getAllUsers();
    getAllAreas();
    getAllJobs(page, filters);
  }, [page]);

  return (
    <>
      {/*     CAMBIAR */}
      {/* style={{ margin: "0 5rem 0 5rem" }} */}
      <div style={{ margin: "0 5rem 0 5rem" }}>
        <h2 className="text-center">Trabajos</h2>
        <div className="d-flex justify-content-end">
          {/*           <Button
            className="btn btn-success"
            onClick={() => navigate("/customers/create")}
          >
            <i className="fa-solid fa-plus"></i> Subir trabajo
          </Button> */}
        </div>
        {showDeleteModal ? (
          <ModalDelete entity={JobToDelete} showAlert={setShowDeleteModal} />
        ) : null}

        <div className=" mt-2">
          <form method="get" className="center-filters" onSubmit={handleSubmit}>
            <div className="me-3">
              <label htmlFor="forName" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="nombre"
                onChange={(e) => handleChangeFilter(e, "name")}
              />
            </div>
            <div style={{ width: "200px" }} className="me-3">
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
            <div style={{ width: "200px" }} className="me-3">
              <label htmlFor="forArea" className="form-label">
                Area
              </label>
              <Select
                options={areasSelector}
                placeholder={"seleccione.."}
                name="areaId"
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
            <Button variant="primary" type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </Button>
          </form>
        </div>
        {allJobs.length > 0 ? (
          <>
            <div className="mt-3">
              <table className="table">
                <thead>
                  <tr>
                    <th>Autor</th>
                    <th>Nombre TP</th>
                    <th>Evaludor 1</th>
                    <th>Evaludor 2</th>
                    <th>Area</th>
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
