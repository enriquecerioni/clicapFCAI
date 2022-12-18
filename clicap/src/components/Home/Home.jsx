import { useState } from "react";
import { isAuthenticated } from "../../helpers/helpers";
import Navbar from "../Navbar/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import { SidebarModify } from "../SidebarModify/SidebarModify";
import "./home.css";
import "../../App.css";
import { MenuPhone } from "../MenuPhone/MenuPhone";

const Home = ({ children }) => {
  const [toogleSidebar, setToogleSidebar] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  /* 
  const putSidebarRespons = () => {
    if (window.innerWidth < 760) {
      setToogleSidebar(true);
      setShowSidebar(false);
    } else {
      setToogleSidebar(false);
      setShowSidebar(true);
    }
  };
  window.addEventListener("resize", putSidebarRespons); */

  return (
    <>
      <div className="">
        <div>
          <MenuPhone />
        </div>
        <div>{children}</div>
        {/*         <Navbar />
        <Container className="h-100">
          <Row className="h-100">
            {isAuthenticated() ? (
              <>
                <Col sm={2} className="col-sidebar p-0">
                  <SidebarModify />
                </Col>
                <Col className="p-0">{children}</Col>
              </>
            ) : (
              <Col className="p-0">{children}</Col>
            )}
          </Row>
        </Container> */}
      </div>
    </>
  );
};

export default Home;
