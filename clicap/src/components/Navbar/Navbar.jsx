import s from "./navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/clicap.png";
import { getDataUserByKey, isAuthenticated } from "../../helpers/helpers";
import * as React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import NavbarBootstrap from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Navbar = () => {
  const navigate = useNavigate();
  const idUser = getDataUserByKey('id');
  const loggout = () => {
    sessionStorage.removeItem("user");
    navigate("/");
  };

  return (
    // <nav className="navbar">
    //   <Link className={s.navImg} to="/">
    //     {/* <img className={s.logoImg} src={logo} alt="logo" /> */}
    //   </Link>
    //   <ul className={s.navUl}>
    //     <li>
    //       <Link className={s.navLink} to="/inscriptions">
    //         Inscripciones
    //       </Link>
    //     </li>
    //     <li>
    //       <Link className={s.navLink} to="/job_submissions">
    //         Presentación de Trabajos
    //       </Link>
    //     </li>
    //     <li>
    //       <Link className={s.navLink} to="/gallery">
    //         Galería
    //       </Link>
    //     </li>
    //     <li>
    //       <Link className={s.navLink} to="/scientific_comittee">
    //         Comité Científico
    //       </Link>
    //     </li>
    //     <li>
    //       <Link className={s.navLink} to="/register">
    //         Registrarse
    //       </Link>
    //     </li>
    //     <li>
    //       {isAuthenticated() ? (
    //         <DropdownButton variant="primary" title={getDataUserByKey("name")} className={s.navLink}>
    //           <Dropdown.Item eventKey="1" onClick={()=>navigate(`/user/edit/${idUser}`)}>Editar Usuario</Dropdown.Item>
    //           <Dropdown.Divider />
    //           <Dropdown.Item eventKey="4" onClick={loggout}>
    //             Cerrar sesión
    //           </Dropdown.Item>
    //         </DropdownButton>
    //       ) : (
    //         <div className={s.navLink} onClick={() => navigate("/login")}>
    //           Ingresar
    //         </div>
    //       )}
    //     </li>
    //   </ul>
    // </nav>
    <NavbarBootstrap bg="light" expand="lg">
      <Container fluid>
        <NavbarBootstrap.Brand href="#">Navbar scroll</NavbarBootstrap.Brand>
        <NavbarBootstrap.Toggle aria-controls="navbarScroll" />
        <NavbarBootstrap.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </NavbarBootstrap.Collapse>
      </Container>
    </NavbarBootstrap>
  );
};

export default Navbar;
