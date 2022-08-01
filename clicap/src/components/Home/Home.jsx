import { isAuthenticated } from "../../helpers/helpers";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/SideBar";
import "./home.scss";

const Home = ({ children }) => {
  return (
    <div className="home">
      <div className="homeContainer">
        <Navbar />
        { isAuthenticated() ? 
        <div className="row">
          <Sidebar />
          <div className="col-lg-10 col-md-6">{children}</div>
        </div>
        : <div>{children}</div>
        }
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
