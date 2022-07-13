import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/SideBar";
import "./home.css";

const Home = () => {
  return (
    <div className="home">
      {/* <Navbar/> */}
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        container
      </div>
    </div>
  );
};

export default Home;
