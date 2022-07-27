import "./navbar.scss";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ArticleIcon from "@mui/icons-material/Article";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import PeopleIcon from "@mui/icons-material/People";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import AppsIcon from "@mui/icons-material/Apps";
import InputIcon from "@mui/icons-material/Input";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/clicap.png";
import { getDataUserByKey, isAuthenticated } from "../../helpers/helpers";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Navbar = () => {
  const navigate = useNavigate();
  const loggout = () => {
    sessionStorage.removeItem('user');
    navigate('/');
  } 
  const idUser = getDataUserByKey('id');
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="image not found" />
        </div>
        <div className="items">
          <div className="item" onClick={() => navigate("/inscriptions")}>
            <HowToRegIcon className="icon" />
            Inscripciones
          </div>
          <div className="item" onClick={() => navigate("/job_submission")}>
            <ArticleIcon className="icon" />
            Presentación de Trabajos
          </div>
          <div className="item" onClick={() => navigate("/gallery")}>
            <PhotoLibraryIcon className="icon" />
            Galería
          </div>
          <div className="item" onClick={() => navigate("/endorsements")}>
            <AppsIcon className="icon" />
            Avales Institucionales
          </div>
          <div className="item" onClick={() => navigate("/scientific_comitte")}>
            <PeopleIcon className="icon" />
            Comité Científico
          </div>
          <div className="item" onClick={() => navigate("/contact")}>
            <ContactMailIcon className="icon" />
            Contáctanos
          </div>
          {isAuthenticated() ? (
            <DropdownButton
              variant='primary'
              title={getDataUserByKey('name')}
            >
              <Dropdown.Item eventKey="1" onClick={() => navigate(`/user/edit/${idUser}`)}>Editar Usuario</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="4" onClick={loggout}>Cerrar sesión</Dropdown.Item>
            </DropdownButton>
          ) : (
            <div className="item" onClick={() => navigate("/login")}>
              <InputIcon className="icon" />
              Ingresar
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
