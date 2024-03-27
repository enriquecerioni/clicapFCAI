import "../../App.css";
import "./home.css";
import { AppContext } from "../../context/App/AppContext";
import { Container, Row, Col } from "react-bootstrap";
import { Footer } from "../Footer/Footer";
import { isAuthenticated } from "../../helpers/helpers";
import { MenuPhone } from "../MenuPhone/MenuPhone";
import { Sidebar } from "../../components/Sidebar/SideBar";
import { useContext, useEffect } from "react";
import Navbar from "../Navbar/Navbar";

const Home = ({ children }) => {
  const { appState, setSearchPixels, setMenuPhone } = useContext(AppContext);
  const { searchPixels, menuPhone, loggout } = appState;

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
      setSearchPixels(true);
      putSidebarRespons();
    }
  }, [loggout]);

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
                        overflowY: "auto",
                      }}
                    >
                      <Sidebar />
                    </Col>
                    <Col className="p-0" style={{ backgroundColor: "#D2E9E9", flexGrow: 1, overflowY: "auto" }}>
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
            <Footer />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
