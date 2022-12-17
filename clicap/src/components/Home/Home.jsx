import { useState } from "react";
import { isAuthenticated } from "../../helpers/helpers";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/SideBar";
import "./home.css";

const Home = ({ children }) => {
  const [toogleSidebar, setToogleSidebar] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const putSidebarRespons = () => {
    if (window.innerWidth < 760) {
      setToogleSidebar(true);
      setShowSidebar(false);
    } else {
      setToogleSidebar(false);
      setShowSidebar(true);
    }
  };
  window.addEventListener("resize", putSidebarRespons);

  return (
    <div className="home">
      <div className="homeContainer">
        <Navbar />
        {isAuthenticated() ? (
          <div className="row">
            <div className="showGearSide">
              <i
                className="fa-solid fa-gear fa-2x rotate"
                type="button"
                onClick={() => setShowSidebar(!showSidebar)}
              ></i>
            </div>
            {showSidebar ? <Sidebar /> : null}
            <div className="col-lg-10 col-md-6" style={{background:"lightblue"}}>{children}</div>
          </div>
        ) : (
          <div>{children}</div>
        )}
        <div className="widgets">
          {/* <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" /> */}
        </div>
        <div className="charts">
          {/* <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} /> */}
        </div>
        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
