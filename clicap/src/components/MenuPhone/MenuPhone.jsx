import React, { useState } from "react";
import { Button } from "react-bootstrap";
import logo from "../../assets/clicap.png";
import { isAuthenticated } from "../../helpers/helpers";
import { NavbarPhone } from "./NavbarPhone/NavbarPhone";
import { SidebarPhone } from "./sidebarPhone/SidebarPhone";

export const MenuPhone = () => {
  const [showSidebarPhone, setShowSidebarPhone] = useState(false);
  const [showNavbarPhone, setShowNavbarPhone] = useState(false);

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
          <img className="logoImg" src={logo} alt="logo" />
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
