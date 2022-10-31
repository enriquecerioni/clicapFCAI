// import s from "./navbar.module.css";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/clicap.png";
import { getDataUserByKey, isAuthenticated } from "../../helpers/helpers";
import * as React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import NavbarBootstrap from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Navbar = () => {
  const navigate = useNavigate();
  const idUser = getDataUserByKey("id");
  const loggout = () => {
    sessionStorage.removeItem("user");
    navigate("/");
  };

  return (
    <ul className="ulNav">
      <div>
        <img className="logoImg" src={logo} alt="logo" onClick={() => navigate("/")} />
      </div>
      <div>
      <li className="liNav">
        <div className="dropdown">
          <li onClick={() => navigate('/')}><a href="">Inicio</a></li>
          <div className="dropdown-content">
            <a class="active" href="" onClick={() => navigate('/scientific_comittee')}>Comité Científico</a>
            <a class="active" href="" onClick={() => navigate('/organizing_committee')}>Comité Organizador</a>
            <a class="active" href="" onClick={() => navigate('/institutional_guarantees')}>Avales Institucionales</a>
            <a class="active" href="" onClick={() => navigate('/sponsors')}>Auspiciantes</a>
          </div>
        </div>
      </li>
      
      <li className="liNav">
        <div className="dropdown">
          <li><a href="#news">Fechas Importantes</a></li>
        </div>
      </li>

      <li className="liNav">
        <div className="dropdown">
          <li><a href="#news">Trabajos</a></li>
          <div className="dropdown-content">
            <a class="active" href="" onClick={() => navigate('/areas')}>Áreas</a>
            <a class="active" href="" onClick={() => navigate('/modalities')}>Modalidad de Presentación</a>
            <a class="active" href="" onClick={() => navigate('/exhibitions')}>Dinámica de exposiciones</a>
          </div>
        </div>
      </li>

      <li className="liNav">
        <div className="dropdown">
          <li><a href="#news">Inscripción</a></li>
          <div className="dropdown-content">
            <a class="active" href="" onClick={() => navigate('/register')}>Registro</a>
            <a class="active" href="" onClick={() => navigate('/login')}>Acceso</a>
          </div>
        </div>
      </li>

      <li className="liNav">
        <div className="dropdown">
          <li><a href="" onClick={() => navigate('/news')}>Novedades</a></li>
        </div>
      </li>

      <li className="liNav">
        <div className="dropdown">
          <li><a href="" onClick={() => navigate('/contact')}>Contacto</a></li>
        </div>
      </li>              
      </div>
    </ul>
    // <NavbarBootstrap bg="light" expand="lg">
    //   <Container fluid>
    //     <NavbarBootstrap.Brand>
    //       <img
    //         className={s.logoImg}
    //         src={logo}
    //         alt="logo"
    //         onClick={() => navigate("/")}
    //       />
    //     </NavbarBootstrap.Brand>
    //     <NavbarBootstrap.Toggle aria-controls="navbarScroll" />
    //     <NavbarBootstrap.Collapse id="navbarScroll">
    //       <Nav
    //         className="justify-content-end flex-grow-1 pe-3"
    //         style={{ maxHeight: "300px", marginRight: "2.5rem" }}
    //       >
    //         {/* <Nav.Link onClick={() => navigate("/")}>Inicio</Nav.Link> */}
    //         {/* Inicio */}
    //         <NavDropdown title="Inicio" id="navbarScrollingDropdown">
    //           <NavDropdown.Item onClick={() => navigate("/")}>
    //             Página Principal
    //           </NavDropdown.Item>
    //           <NavDropdown.Item onClick={() => navigate("/congress_videos")}>
    //             Comité Científico
    //           </NavDropdown.Item>
    //           <NavDropdown.Item onClick={() => navigate("/image_gallery")}>
    //             Comité Organizador
    //           </NavDropdown.Item>
    //           <NavDropdown.Item onClick={() => navigate("/image_gallery")}>
    //             Avales Institucionales
    //           </NavDropdown.Item>
    //           <NavDropdown.Item onClick={() => navigate("/image_gallery")}>
    //             Auspiciantes
    //           </NavDropdown.Item>
    //         </NavDropdown>
    //         {/* Fechas Importantes */}
    //         <NavDropdown title="Fechas Importantes" id="navbarScrollingDropdown">
    //           <NavDropdown  title="Trabajos">
    //             <NavDropdown.Item onClick={() => navigate("/welcome_clicap")}>
    //               SubTrabajo
    //             </NavDropdown.Item>
    //           </NavDropdown>
    //           <NavDropdown.Item onClick={() => navigate("/congress_videos")}>
    //             Videos del Congreso
    //           </NavDropdown.Item>
    //           <NavDropdown.Item onClick={() => navigate("/image_gallery")}>
    //             Galería de Imágenes
    //           </NavDropdown.Item>
    //         </NavDropdown>
    //         {/* Inscripciones */}
    //         <NavDropdown title="Inscripciones" id="navbarScrollingDropdown">
    //           <NavDropdown.Item onClick={() => navigate("/inscriptions")}>
    //             Inscripción - Aranceles
    //           </NavDropdown.Item>
    //           <NavDropdown.Item onClick={() => navigate("/register")}>
    //             Formulario de Inscripción
    //           </NavDropdown.Item>
    //           {/* <NavDropdown.Divider />
    //           <NavDropdown.Item href="#action5">
    //             Something else here
    //           </NavDropdown.Item> */}
    //         </NavDropdown>
    //         {/* Trabajos */}
    //         <NavDropdown title="Trabajos" id="navbarScrollingDropdown">
    //           <NavDropdown.Item onClick={() => navigate("/job_modality")}>
    //             Modalidad de Presentación
    //           </NavDropdown.Item>
    //           <NavDropdown.Item onClick={() => navigate("/thematic_areas")}>
    //             Áreas Temáticas
    //           </NavDropdown.Item>
    //         </NavDropdown>
    //         {/* Nosotros */}
    //         <NavDropdown title="Nosotros" id="navbarScrollingDropdown">
    //           <NavDropdown.Item
    //             onClick={() => navigate("/organizing_committee")}
    //           >
    //             Comité Organizador
    //           </NavDropdown.Item>
    //           <NavDropdown.Item
    //             onClick={() => navigate("/scientific_comittee")}
    //           >
    //             Comité Científico
    //           </NavDropdown.Item>
    //         </NavDropdown>
    //         {/* Contacto */}
    //         <Nav.Link onClick={() => navigate("/contact")}>
    //           Contáctanos
    //         </Nav.Link>

    //         {isAuthenticated() ? (
    //           <DropdownButton
    //             variant="primary"
    //             title={getDataUserByKey("name")}
    //             className={s.navLink}
    //           >
    //             <Dropdown.Item
    //               eventKey="1"
    //               onClick={() => navigate(`/user/edit/${idUser}`)}
    //             >
    //               Editar Usuario
    //             </Dropdown.Item>
    //             <Dropdown.Divider />
    //             <Dropdown.Item eventKey="4" onClick={loggout}>
    //               Cerrar sesión
    //             </Dropdown.Item>
    //           </DropdownButton>
    //         ) : (
    //           <Nav.Link
    //             onClick={() => navigate("/login")}
    //             className={s.accessButton}
    //           >
    //             <button className="btn btn-primary">Accesso / Registro</button>
    //           </Nav.Link>
    //         )}
    //       </Nav>
    //       {/* <Form className="d-flex">
    //         <Form.Control
    //           type="search"
    //           placeholder="Search"
    //           className="me-2"
    //           aria-label="Search"
    //         />
    //         <Button variant="outline-success">Search</Button>
    //       </Form> */}
    //     </NavbarBootstrap.Collapse>
    //   </Container>
    // </NavbarBootstrap>
  );
};

export default Navbar;
