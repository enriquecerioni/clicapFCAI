import { isAuthenticated } from "../../helpers/helpers";
import Navbar from "../Navbar/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import { SidebarModify } from "../SidebarModify/SidebarModify";
import "./home.css";
import "../../App.css";
import { MenuPhone } from "../MenuPhone/MenuPhone";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/App/AppContext";

const Home = ({ children }) => {

  const { appState, setSearchPixels, setMenuPhone } = useContext(AppContext);
  const { searchPixels, menuPhone } = appState;

  const putSidebarRespons = () => {
    if (window.innerWidth < 760) {
      setMenuPhone(true);
    } else {
      setMenuPhone(false);
    }
  };
  /* window.addEventListener("resize", putSidebarRespons); */

  useEffect(() => {
    if (!searchPixels) {
      console.log("Recarga dimensiones");
      setSearchPixels(true);
      putSidebarRespons();
    }
  }, []);

  return (
    <>
      <div className="">
        {!menuPhone ? (
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
                        borderTopRightRadius: "10px",
                      }}
                    >
                      <SidebarModify />
                    </Col>
                    <Col className="p-0" style={{ backgroundColor: "#D2E9E9" }}>
                      {children}
                    </Col>
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
