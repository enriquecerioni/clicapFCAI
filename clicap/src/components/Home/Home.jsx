import { isAuthenticated } from "../../helpers/helpers";
import Navbar from "../Navbar/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import { SidebarModify } from "../SidebarModify/SidebarModify";
import "./home.css";
import "../../App.css";
import { MenuPhone } from "../MenuPhone/MenuPhone";
import { useState } from "react";

const Home = ({ children }) => {
  const [showMenuPhone, setShowMenuPhone] = useState(false);

  const putSidebarRespons = () => {
    if (window.innerWidth < 760) {
      setShowMenuPhone(true);
    } else {
      setShowMenuPhone(false);
    }
  };
  window.addEventListener("resize", putSidebarRespons);

  return (
    <>
      <div className="">
        {!showMenuPhone ? (
          <div className="show-menu-desktop">
            <Navbar />
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
            </Container>
          </div>
        ) : (
          <div className="show-menu-phone">
            <MenuPhone />
            <Col className="p-0">{children}</Col>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
