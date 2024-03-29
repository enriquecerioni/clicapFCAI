import React from "react";
import { useNavigate } from "react-router-dom";

export const NavbarPhone = ({ showNavbarPhone, setShowNavbarPhone }) => {
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
                  onClick={() => {
                    setShowNavbarPhone(!showNavbarPhone);
                    navigate("/scientific-committee");
                  }}
                >
                  Comité Científico
                </p>
                <p
                  className="active"
                  href=""
                  onClick={() => {
                    setShowNavbarPhone(!showNavbarPhone);
                    navigate("/organizing-committee");
                  }}
                >
                  Comité Organizador
                </p>
                <p
                  className="active"
                  href=""
                  onClick={() => {
                    setShowNavbarPhone(!showNavbarPhone);
                    navigate("/institutional");
                  }}
                >
                  Avales Institucionales
                </p>
                <p
                  className="active"
                  href=""
                  onClick={() => {
                    setShowNavbarPhone(!showNavbarPhone);
                    navigate("/sponsors");
                  }}
                >
                  Auspiciantes
                </p>
              </div>
            </div>
          </div>

          <div className="liNav">
            <div className="dropdown">
              <div
                onClick={() => {
                  setShowNavbarPhone(!showNavbarPhone);
                  navigate("/importantdates");
                }}
              >
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
                  onClick={() => {
                    setShowNavbarPhone(!showNavbarPhone);
                    navigate("/areas");
                  }}
                >
                  Áreas
                </p>
                <p
                  className="active"
                  type="button"
                  onClick={() => {
                    setShowNavbarPhone(!showNavbarPhone);
                    navigate("/modalities");
                  }}
                >
                  Modalidad de Presentación
                </p>
                <p
                  className="active"
                  type="button"
                  onClick={() => {
                    setShowNavbarPhone(!showNavbarPhone);
                    navigate("/expositions");
                  }}
                >
                  Dinámica de exposiciones
                </p>
              </div>
            </div>
          </div>

          <div className="liNav">
            <div className="dropdown">
              <div
                onClick={() => {
                  setShowNavbarPhone(!showNavbarPhone);
                  navigate("/register");
                }}
              >
                <p type="button">Aranceles</p>
              </div>
            </div>
          </div>

          <div className="liNav">
            <div className="dropdown">
              <div>
                <p
                  type="button"
                  onClick={() => {
                    setShowNavbarPhone(!showNavbarPhone);
                    navigate("/login");
                  }}
                >
                  Acceso
                </p>
              </div>
            </div>
          </div>

          <div className="liNav">
            <div className="dropdown">
              <div>
                <p
                  type="button"
                  onClick={() => {
                    setShowNavbarPhone(!showNavbarPhone);
                    navigate("/news");
                  }}
                >
                  Novedades
                </p>
              </div>
            </div>
          </div>

          <div className="liNav">
            <div className="dropdown">
              <div>
                <p
                  type="button"
                  onClick={() => {
                    setShowNavbarPhone(!showNavbarPhone);
                    navigate("/contact");
                  }}
                >
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
