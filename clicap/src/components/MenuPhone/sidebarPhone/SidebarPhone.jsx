import React from "react";
import "../menuPhone.css";
import { useNavigate } from "react-router-dom";
import { getDataUserByKey } from "../../../helpers/helpers";
import { sidebarOptions } from "../../../helpers/sidebarOptions";

export const SidebarPhone = ({ showSidebarPhone, setShowSidebarPhone }) => {
  const roleId = getDataUserByKey("roleId");
  const idUser = getDataUserByKey("id");
  const loggout = () => {
    sessionStorage.removeItem("user");
    setShowSidebarPhone(!showSidebarPhone);
    navigate("/");
    // window.location.reload();
  };
  const navigate = useNavigate();

  const redirectJobPage = () => {
    if (roleId === 1 || roleId === 2) {
      setShowSidebarPhone(!showSidebarPhone);
      return navigate("/jobs");
    }
    setShowSidebarPhone(!showSidebarPhone);
    navigate("/myjobs");
  };

  return (
    <>
      <div className="sidebarPhone-box animate__animated animate__fadeInLeft">
        <div className="sidebar">
          <ul style={{ listStyle: "none" }} className=" ulSidebar p-0">
            <li
              className="d-flex gap-2 align-items-center li-sidebar"
              type="button"
              onClick={() => {
                setShowSidebarPhone(!showSidebarPhone);
                navigate("/home");
              }}
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
                        className="d-flex gap-2 align-items-center li-sidebar"
                        type="button"
                        onClick={() => {
                          setShowSidebarPhone(!showSidebarPhone);
                          navigate(op.redirection);
                        }}
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

            <p className="m-0 section-sidebar">USUARIO</p>
            <li
              onClick={() => {
                setShowSidebarPhone(!showSidebarPhone);
                navigate(`/user/edit/${idUser}`);
              }}
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
      </div>
    </>
  );
};
