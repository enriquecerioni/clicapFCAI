import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">clicap</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Main</p>
          <li>
            <DashboardIcon className="icon"/>
            <span>Dashboard</span>
          </li>
          <p className="title">Usuarios</p>
          <li>
            <PersonOutlineOutlinedIcon className="icon"/>
            <span>Usuarios</span>
          </li>
          <p className="title">Pagos</p>
          <li>
            <PaidOutlinedIcon className="icon"/>
            <span>Pagos</span>
          </li>
          <li>
            <ArticleOutlinedIcon className="icon"/>
            <span>Documentos</span>
          </li>
        </ul>
      </div>
      <div className="bottom"></div>
    </div>
  );
};

export default Sidebar;
