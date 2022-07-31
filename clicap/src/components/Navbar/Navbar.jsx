import s from "./navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/clicap.png";
import { getDataUserByKey, isAuthenticated } from "../../helpers/helpers";
import * as React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const Navbar = () => {
  const navigate = useNavigate();
  const loggout = () => {
    sessionStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link className={s.navImg} to="/">
        <img className={s.logoImg} src={logo} alt="logo" />
      </Link>
      <ul className={s.navUl}>
        <li>
          <Link className={s.navLink} to="/inscriptions">
            Inscripciones
          </Link>
        </li>
        <li>
          <Link className={s.navLink} to="/job_submissions">
            Presentación de Trabajos
          </Link>
        </li>
        <li>
          <Link className={s.navLink} to="/gallery">
            Galería
          </Link>
        </li>
        <li>
          <Link className={s.navLink} to="/scientific_comittee">
            Comité Científico
          </Link>
        </li>
        <li>
          <Link className={s.navLink} to="/register">
            Registrarse
          </Link>
        </li>
        <li>
          {isAuthenticated() ? (
            <DropdownButton variant="primary" title={getDataUserByKey("name")} className={s.navLink}>
              <Dropdown.Item eventKey="1">Editar Usuario</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="4" onClick={loggout}>
                Cerrar sesión
              </Dropdown.Item>
            </DropdownButton>
          ) : (
            <div className={s.navLink} onClick={() => navigate("/login")}>
              Ingresar
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
