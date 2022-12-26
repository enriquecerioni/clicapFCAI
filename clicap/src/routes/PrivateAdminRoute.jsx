import React from "react";
import Home from "../components/Home/Home";
import { StateContext } from "../context/StateContext";
import { getDataUserByKey, isAuthenticated } from "../helpers/helpers";

export default function PrivateAdminRoute({ children }) {
  const auth = isAuthenticated();
  const roleId = getDataUserByKey("roleId");
  return (auth && roleId === 1) || roleId === 2 ? (
    <Home>
      {" "}
      <StateContext>{children}</StateContext>{" "}
    </Home>
  ) : (
    <div>Este usuario no tiene permisos</div>
  );
}
