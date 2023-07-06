import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ModalDelete from "../Modals/ModalDelete";
import { UsersList } from "./UsersList";
import { Button } from "react-bootstrap";
import Select from "react-select";
import { PaginationCustom } from "../Pagination/Pagination";
import { getDataUserByKey, reqAxiosDownload } from "../../helpers/helpers";
import { UserContext } from "../../context/User/UserContext";
import { ExtensiveList } from "../ExtensiveList/ExtensiveList";
import "./users.css";
import { RegisterContext } from "../../context/Register/RegisterContext";

const Users = ({ showModalCertificate }) => {
  const navigate = useNavigate();
  const roleId = getDataUserByKey("roleId");
  const location = useLocation();
  const { pathname } = location;

  const { getAllUsers, userState, getUsersFiltered } = useContext(UserContext);
  const { usersSelector, users, usersFiltered, totalUsersPages } = userState;

  const { getAllRoles, registerState } = useContext(RegisterContext);
  const { rolesSelector } = registerState;

  const initialFilters = {
    name: "",
    roleId: "",
    identifyNumber: "",
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [userToDelete, setUserToDelete] = useState(false);
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

  const exportToExcel = async () => {
    await reqAxiosDownload(`/user/export/users`, filters, "Usuarios");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getUsersFiltered(1, filters);
  };

  useEffect(() => {
    if (users.length === 0) {
      getAllUsers();
    }
    if (rolesSelector.length === 0) {
      getAllRoles();
    }
    getUsersFiltered(page, filters);
  }, [page]);

  return (
    <>
      {showDeleteModal ? (
        <ModalDelete entity={userToDelete} showAlert={setShowDeleteModal} />
      ) : null}

      <div className="ms-3 me-3">
        <h2 className="text-center">Listado de Usuarios</h2>

        {roleId === 1 ? (
          <div className="">
            <form
              method="get"
              className="center-filter"
              onSubmit={handleSubmit}
            >
              <div className="me-3" style={{ width: "350px" }}>
                <label htmlFor="forName" className="form-label">
                  DNI - Nombre
                </label>
                <Select
                  components={{ ExtensiveList }}
                  options={usersSelector}
                  placeholder={"Seleccione..."}
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
                  options={rolesSelector}
                  placeholder={"Seleccione..."}
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

              <button className="btn btn-primary" type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
              {pathname !== "/generate-certificate" ? (
                <Button variant="btn btn-secondary" onClick={exportToExcel}>
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
                    <th>DNI / Pasaporte</th>
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
