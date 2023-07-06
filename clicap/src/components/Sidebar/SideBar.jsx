import React, { useContext, useEffect, useState } from "react";
import { getDataUserByKey } from "../../helpers/helpers";
import "./sidebar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/App/AppContext";
import { sidebarOptions } from "../../helpers/sidebarOptions";

export const Sidebar = () => {
  const roleId = getDataUserByKey("roleId");
  const idUser = getDataUserByKey("id");

  const navigate = useNavigate();
  const location = useLocation();

  const { setLoggout, setRefreshRoleIdAndUserId } = useContext(AppContext);

  const [url, setUrl] = useState(null);

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

          {sidebarOptions.map((section) => {
            return (
              <>
                <div className="center-center">
                  <hr
                    style={{ border: "1px solid white", width: "100px" }}
                  ></hr>
                </div>

                <p className="m-0 section-sidebar">{section.section}</p>

                {section["options"].map((op) => {
                  return op.roles.includes(roleId) ? (
                    <li
                      className={`d-flex gap-2 align-items-center li-sidebar ${
                        url === op.redirection ? "sidebar-activate" : ""
                      }`}
                      type="button"
                      onClick={() => navigate(op.redirection)}
                    >
                      <div className="li-box-icon">
                        <i className={`${op.icon}`}></i>
                      </div>
                      <div>
                        <span>{op.name}</span>
                      </div>
                    </li>
                  ) : null;
                })}
              </>
            );
          })}

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
