import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PaidIcon from "@mui/icons-material/Paid";
import TaskIcon from "@mui/icons-material/Task";
import { Link, useNavigate } from "react-router-dom";
import { getDataUserByKey, isAuthenticated } from "../../helpers/helpers";

const Sidebar = () => {
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
    <div className="sidebar sidebarshow col-lg-2 col-md-6 animate__animated animate__fadeInLeftBig">
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li onClick={() => navigate("/home")}>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          {roleId === 1 ? (
            <Link to="/users" style={{ textDecoration: "none" }}>
              <li>
                <PersonOutlineIcon className="icon" />
                <span>Usuarios</span>
              </li>
            </Link>
          ) : null}
          <li onClick={() => redirectJobPage()}>
            <StoreIcon className="icon" />
            {roleId === 1 ? (
              <span>Listado de Trabajos</span>
            ) : roleId === 2 ? (
              <span>Trabajos asignados</span>
            ) : (
              <span>Mis Trabajos</span>
            )}
          </li>
          <li
            onClick={
              roleId === 1 ? () => navigate("/pays") : () => navigate("/mypays")
            }
          >
            <PaidIcon className="icon" />
            {roleId === 1 ? (
              <span>Listado de Pagos</span>
            ) : (
              <span>Mis Pagos</span>
            )}
          </li>
          <li
            onClick={
              roleId === 1
                ? () => navigate("/certificates")
                : () => navigate("/student")
            }
          >
            <TaskIcon className="icon" />
            {roleId === 1 ? (
              <span>Listado de Certificados</span>
            ) : (
              <span>Certificado de Alumno</span>
            )}
          </li>
          {/* <Link to="/works" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Trabajos (Admin)</span>
            </li>
          </Link>
          <li>
            <LocalShippingIcon className="icon" />
            <span>Delivery</span>
          </li>
          <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li> */}
          <p className="title">USUARIO</p>
          <li onClick={() => navigate(`/user/edit/${idUser}`)}>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Editar Perfil</span>
          </li>
          <li onClick={loggout}>
            <ExitToAppIcon className="icon" />
            <span>Cerrar Sesión</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
