import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { isAuthenticated } from "../../helpers/helpers";
import { NavbarPhone } from "./NavbarPhone/NavbarPhone";
import { SidebarPhone } from "./sidebarPhone/SidebarPhone";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/App/AppContext";
import { useNavigate } from "react-router-dom";

export const MenuPhone = () => {
  const navigate = useNavigate();

  const [showSidebarPhone, setShowSidebarPhone] = useState(false);
  const [showNavbarPhone, setShowNavbarPhone] = useState(false);
  const { getAppLogo } = useContext(AppContext);

  const [logoApp, setLogoApp] = useState("");

  const loadAppLogo = async () => {
    const AppLogo = await getAppLogo();
    setLogoApp(AppLogo);
  };

  useEffect(() => {
    loadAppLogo();
  }, []);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between p-1">
        {isAuthenticated() ? (
          <div>
            <Button
              variant="primary"
              onClick={() => {
                setShowNavbarPhone(false);
                setShowSidebarPhone(!showSidebarPhone);
              }}
            >
              <i
                className={`fa-solid ${
                  !showSidebarPhone ? "fa-user-gear" : "fa-xmark"
                }`}
              ></i>
            </Button>{" "}
          </div>
        ) : null}

        <div>
          <img
            className="logoImg"
            src={`data:image/png;base64,${logoApp}`}
            alt="logo"
            onClick={() => navigate("/")}
          />
        </div>

        <div>
          <Button
            variant="primary"
            onClick={() => {
              setShowSidebarPhone(false);
              setShowNavbarPhone(!showNavbarPhone);
            }}
          >
            <i
              className={`fa-solid ${
                !showNavbarPhone ? "fa-bars" : "fa-xmark"
              } `}
            ></i>
          </Button>{" "}
        </div>
      </div>

      {showSidebarPhone ? (
        <div>
          <SidebarPhone
            showSidebarPhone={showSidebarPhone}
            setShowSidebarPhone={setShowSidebarPhone}
          />
        </div>
      ) : null}

      {showNavbarPhone ? (
        <div>
          <NavbarPhone
            showNavbarPhone={showNavbarPhone}
            setShowNavbarPhone={setShowNavbarPhone}
          />
        </div>
      ) : null}
    </>
  );
};
