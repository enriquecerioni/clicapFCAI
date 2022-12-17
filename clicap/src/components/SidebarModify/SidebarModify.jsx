import React from "react";
import { getDataUserByKey } from "../../helpers/helpers";
import "./sidebar.css";
import { Link, useNavigate } from "react-router-dom";

export const SidebarModify = () => {
  const roleId = getDataUserByKey("roleId");
  const idUser = getDataUserByKey("id");
  const loggout = () => {
    sessionStorage.removeItem("user");
    navigate("/");
    // window.location.reload();
  };
  const navigate = useNavigate();

  const redirectJobPage = () => {
    if (roleId === 1 || roleId === 2) {
      return navigate("/jobs");
    }
    navigate("/myjobs");
  };
  return (
    <>
      <div className="sidebar">
        <ul style={{ listStyle: "none" }} className=" ulSidebar p-0">
          <p className="m-0 section-sidebar">MENU</p>
          <li
            className="d-flex gap-2 align-items-center li-sidebar"
            type="button"
            onClick={() => navigate("/home")}
          >
            <div className="li-box-icon">
              <i className="fa-solid fa-house"></i>
            </div>
            <div>
              <span>Menú principal</span>
            </div>
          </li>
          <p className="m-0 section-sidebar">LISTAS</p>
          {roleId === 1 ? (
            <li
              className="d-flex gap-2 align-items-center li-sidebar"
              type="button"
              onClick={() => navigate("/users")}
            >
              <div className="li-box-icon">
                <i className="fa-solid fa-users"></i>
              </div>
              <div>
                <span>Listado de Usuarios</span>
              </div>
            </li>
          ) : null}

          <li
            onClick={() => redirectJobPage()}
            className="d-flex gap-2 align-items-center li-sidebar"
            type="button"
          >
            <div className="li-box-icon">
              <i className="fa-solid fa-file"></i>
            </div>
            <div>
              {roleId === 1 ? (
                <span>Listado de Trabajos</span>
              ) : roleId === 2 ? (
                <span>Trabajos asignados</span>
              ) : (
                <span>Mis Trabajos</span>
              )}
            </div>
          </li>

          <li
            onClick={
              roleId === 1 ? () => navigate("/pays") : () => navigate("/mypays")
            }
            className="d-flex gap-2 align-items-center li-sidebar"
            type="button"
          >
            <div className="li-box-icon">
              <i className="fa-solid fa-wallet"></i>
            </div>
            <div>
              {roleId === 1 ? (
                <span>Listado de Pagos</span>
              ) : (
                <span>Mis Pagos</span>
              )}
            </div>
          </li>

          <li
            onClick={
              roleId === 1
                ? () => navigate("/certificates")
                : () => navigate("/student")
            }
            className="d-flex gap-2 align-items-center li-sidebar"
            type="button"
          >
            <div className="li-box-icon">
              <i className="fa-solid fa-list-check"></i>
            </div>
            <div>
              {roleId === 1 ? (
                <span>Listado de Constancias de AR</span>
              ) : (
                <span>Constancia de Alumno regular</span>
              )}
            </div>
          </li>

          <li
            onClick={() => navigate(`/mycertificates`)}
            className="d-flex gap-2 align-items-center li-sidebar"
            type="button"
          >
            <div className="li-box-icon">
              <i className="fa-solid fa-user-graduate"></i>
            </div>
            <div>
              <span>Mis certificados</span>
            </div>
          </li>

          <p className="m-0 section-sidebar">USUARIO</p>
          <li
            onClick={() => navigate(`/user/edit/${idUser}`)}
            className="d-flex gap-2 align-items-center li-sidebar"
            type="button"
          >
            <div className="li-box-icon">
              <i className="fa-solid fa-user-pen"></i>
            </div>
            <div>
              <span>Editar Perfil</span>
            </div>
          </li>

          <li
            onClick={loggout}
            className="d-flex gap-2 align-items-center li-sidebar"
            type="button"
          >
            <div className="li-box-icon">
              <i className="fa-solid fa-right-from-bracket"></i>
            </div>
            <div>
              <span>Cerrar Sesión</span>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};
