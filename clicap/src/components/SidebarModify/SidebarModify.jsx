import React, { useContext, useEffect, useState } from "react";
import { getDataUserByKey } from "../../helpers/helpers";
import "./sidebar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/App/AppContext";

export const SidebarModify = () => {
  const roleId = getDataUserByKey("roleId");
  const idUser = getDataUserByKey("id");

  const navigate = useNavigate();
  const location = useLocation();

  const { setLoggout, setRefreshRoleIdAndUserId } = useContext(AppContext);

  const [url, setUrl] = useState(null);

  const redirectJobPage = () => {
    if (roleId === 1 || roleId === 2) {
      return navigate("/jobs");
    }
    navigate("/myjobs");
  };

  const loggout = () => {
    sessionStorage.removeItem("user");
    setRefreshRoleIdAndUserId(true);
    if (location.pathname === "/") {
      setLoggout();
    }
    navigate("/");
  };

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  return (
    <>
      <div className="sidebar">
        <ul style={{ listStyle: "none" }} className=" ulSidebar p-0">
          <li
            className={`d-flex gap-2 align-items-center li-sidebar ${
              url === "/home" ? "sidebar-activate" : ""
            }`}
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
          <div className="center-center">
            <hr style={{ border: "1px solid white", width: "100px" }}></hr>
          </div>
          <p className="m-0 section-sidebar">Listas</p>
          {roleId === 1 ? (
            <li
              className={`d-flex gap-2 align-items-center li-sidebar ${
                url === "/users" ? "sidebar-activate" : ""
              }`}
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
            className={`d-flex gap-2 align-items-center li-sidebar ${
              url === "/myjobs" || url === "/jobs" ? "sidebar-activate" : ""
            }`}
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
            className={`d-flex gap-2 align-items-center li-sidebar ${
              url === "/pays" || url === "/mypays" ? "sidebar-activate" : ""
            }`}
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
            className={`d-flex gap-2 align-items-center li-sidebar ${
              url === "/certificates" || url === "/student"
                ? "sidebar-activate"
                : ""
            }`}
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
            onClick={
              roleId === 1
                ? () => navigate("/generate-certificate")
                : () => navigate("/mycertificates")
            }
            className={`d-flex gap-2 align-items-center li-sidebar ${
              url === "/generate-certificate" || url === "/mycertificates"
                ? "sidebar-activate"
                : ""
            }`}
            type="button"
          >
            <div className="li-box-icon">
              <i className="fa-solid fa-user-graduate"></i>
            </div>

            <div>
              {roleId === 1 ? (
                <span>Generar Certificado</span>
              ) : (
                <span>Mis certificados</span>
              )}
            </div>
          </li>

          {roleId === 1 && (
            <li
              onClick={() => navigate("/configuration")}
              className={`d-flex gap-2 align-items-center li-sidebar ${
                url === "/configuration" ? "sidebar-activate" : ""
              }`}
              type="button"
            >
              <div className="li-box-icon">
                <i className="fa-solid fa-gear"></i>
              </div>
              <div>
                <span>Configuración</span>
              </div>
            </li>
          )}

          <div className="center-center">
            <hr style={{ border: "1px solid white", width: "100px" }}></hr>
          </div>

          <p className="m-0 section-sidebar">Usuario</p>
          <li
            onClick={() => navigate(`/user/edit/${idUser}`)}
            className={`d-flex gap-2 align-items-center li-sidebar ${
              url === `/user/edit/${idUser}` ? "sidebar-activate" : ""
            }`}
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
