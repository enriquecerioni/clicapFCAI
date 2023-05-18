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
          <div className="show-menu-desktop h-100">
            <Navbar />
            <Container className="h-100">
              <Row className="h-100">
                {isAuthenticated() ? (
                  <>
                    <Col
                      sm={2}
                      className="col-sidebar p-0"
                      style={{
                        borderRightColor: "#ffff",
                        backgroundColor: "#2864f6",
                        borderTopRightRadius:'10px'
                      }}
                    >
                      <SidebarModify />
                    </Col>
                    <Col className="p-0" style={{backgroundColor:'#D2E9E9'}}>{children}</Col>
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
