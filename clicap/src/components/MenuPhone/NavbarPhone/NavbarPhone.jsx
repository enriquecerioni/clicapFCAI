import React from "react";
import { useNavigate } from "react-router-dom";

export const NavbarPhone = () => {
  const navigate = useNavigate();
  
  return (
    <>
        <div className="sidebarPhone-box animate__animated animate__fadeInLeft">
          <div className="d-flex flex-column">
            <div className="liNav">
              <div className="dropdown">
                <div onClick={() => navigate("/")}>
                  <p type="button">Inicio</p>
                </div>
                <div className="dropdown-content">
                  <p
                    className="active"
                    href=""
                    onClick={() => navigate("/scientific_comittee")}
                  >
                    Comité Científico
                  </p>
                  <p
                    className="active"
                    href=""
                    onClick={() => navigate("/organizing_committee")}
                  >
                    Comité Organizador
                  </p>
                  <p
                    className="active"
                    href=""
                    onClick={() => navigate("/institutional_guarantees")}
                  >
                    Avales Institucionales
                  </p>
                  <p
                    className="active"
                    href=""
                    onClick={() => navigate("/sponsors")}
                  >
                    Auspiciantes
                  </p>
                </div>
              </div>
            </div>

            <div className="liNav">
              <div className="dropdown">
                <div>
                  <p type="button">Fechas Importantes</p>
                </div>
              </div>
            </div>

            <div className="liNav">
              <div className="dropdown">
                <div>
                  <p type="button">Trabajos</p>
                </div>
                <div className="dropdown-content">
                  <p
                    className="active"
                    type="button"
                    onClick={() => navigate("/areas")}
                  >
                    Áreas
                  </p>
                  <p
                    className="active"
                    type="button"
                    onClick={() => navigate("/modalities")}
                  >
                    Modalidad de Presentación
                  </p>
                  <p
                    className="active"
                    type="button"
                    onClick={() => navigate("/exhibitions")}
                  >
                    Dinámica de exposiciones
                  </p>
                </div>
              </div>
            </div>

            <div className="liNav">
              <div className="dropdown">
                <div>
                  <p type="button">Inscripción</p>
                </div>
                <div className="dropdown-content">
                  <p
                    className="active"
                    type="button"
                    onClick={() => navigate("/register")}
                  >
                    Registro
                  </p>
                  <p
                    className="active"
                    type="button"
                    onClick={() => navigate("/login")}
                  >
                    Acceso
                  </p>
                </div>
              </div>
            </div>

            <div className="liNav">
              <div className="dropdown">
                <div>
                  <p type="button" onClick={() => navigate("/news")}>
                    Novedades
                  </p>
                </div>
              </div>
            </div>

            <div className="liNav">
              <div className="dropdown">
                <div>
                  <p type="button" onClick={() => navigate("/contact")}>
                    Contacto
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};
