import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ModalDelete from "../Modals/ModalDelete";
import { EntitiesContext } from "../../context/EntitiesContext";
import { UsersList } from "./UsersList";
import { Button } from "react-bootstrap";
import Select from "react-select";
import { PaginationCustom } from "../Pagination/Pagination";
import { getDataUserByKey, reqAxiosDownload } from "../../helpers/helpers";
import { UserContext } from "../../context/User/UserContext";
import { ExtensiveList } from "../ExtensiveList/ExtensiveList";
import "./users.css";

const Users = ({ showModalCertificate }) => {
  const navigate = useNavigate();
  const roleId = getDataUserByKey("roleId");
  const location = useLocation();
  const { pathname } = location;
  const { getAllUsers, usersSelector } = useContext(UserContext);
  const initialFilters = {
    name: "",
    roleId: "",
    identifyNumber: "",
  };
  const { usersFiltered, getUsersFiltered, totalUsersPages } =
    useContext(EntitiesContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [userToDelete, setUserToDelete] = useState(false);
  const [page, setPage] = useState(1);

  const RolesOptions = [
    { value: 1, label: "Administrador", target: { name: "roleId", value: 1 } },
    { value: 2, label: "Evaluador", target: { name: "roleId", value: 2 } },
    {
      value: 3,
      label: "Docente investigador",
      target: { name: "roleId", value: 3 },
    },
    { value: 4, label: "Alumno", target: { name: "roleId", value: 4 } },
  ];
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
  const exportToExcel = async () => {
    await reqAxiosDownload(`/user/export/users`, filters);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getUsersFiltered(1, filters);
  };
  useEffect(() => {
    getUsersFiltered(page, filters);
    getAllUsers();
  }, [page]);

  return (
    <>
      {showDeleteModal ? (
        <ModalDelete entity={userToDelete} showAlert={setShowDeleteModal} />
      ) : null}
      {/*     CAMBIAR */}
      {/* style={{ margin: "0 5rem 0 5rem" }} */}
      <div className="ms-3 me-3">
        <h2 className="text-center">Listado de Usuarios</h2>
        <div className="d-flex justify-content-end">
          {/*           <Button
            className="btn btn-success"
            onClick={() => navigate("/customers/create")}
          >
            <i className="fa-solid fa-plus"></i> Subir trabajo
          </Button> */}
        </div>
        {showDeleteModal ? (
          <ModalDelete
            /* entity={customerToDelete} */
            showAlert={setShowDeleteModal}
            /* getCallback={() => getusers(page)} */
          />
        ) : null}
        {roleId === 1 ? (
          <div className="">
            <form
              method="get"
              className="center-filter"
              onSubmit={handleSubmit}
            >
              <div className="me-3" style={{ width: "350px" }}>
                <label htmlFor="forName" className="form-label">
                  Nombre / Dni
                </label>
                <Select
                  components={{ ExtensiveList }}
                  options={usersSelector}
                  placeholder={"seleccione.."}
                  name="identifyNumber"
                  isClearable={true}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary: "#3D84A8",
                    },
                  })}
                  onChange={(e) => handleChangeFilter(e, "identifyNumber")}
                />
              </div>
              <div style={{ width: "200px" }} className="me-3">
                <label htmlFor="forAuthorId" className="form-label">
                  Rol
                </label>
                <Select
                  options={RolesOptions}
                  placeholder={"seleccione.."}
                  name="roleId"
                  isClearable={true}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary: "#3D84A8",
                    },
                  })}
                  onChange={(e) => handleChangeFilter(e, "roleId")}
                />
              </div>

              <Button variant="primary" type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </Button>
              {pathname !== "/generate-certificate" ? (
                <Button variant="primary" onClick={exportToExcel}>
                  Exportar
                </Button>
              ) : null}
            </form>
          </div>
        ) : null}
        {usersFiltered.length > 0 ? (
          <>
            <div style={{ overflowX: "auto" }}>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Dni</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {usersFiltered.map((user) => (
                    <UsersList
                      showModalCertificate={showModalCertificate}
                      user={user}
                      showAlert={setShowDeleteModal}
                      setUserToDelete={setUserToDelete}
                      /*     setCustomerToDelete={handleDelete} */
                      key={user.id}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <PaginationCustom
              currentPage={page}
              totalPages={totalUsersPages}
              paginate={setPage}
            />
          </>
        ) : (
          <p className="text-center">No hay registros</p>
        )}
      </div>
    </>
  );
};
export default Users;
