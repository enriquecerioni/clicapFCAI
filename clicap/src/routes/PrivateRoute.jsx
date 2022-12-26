import React from "react";
import Home from "../components/Home/Home";
import { StateContext } from "../context/StateContext";
import { isAuthenticated } from "../helpers/helpers";

export default function PrivateRoute({ children }) {
  const auth = isAuthenticated();
  return auth ? (
    <Home>
      <StateContext> {children} </StateContext>
    </Home>
  ) : (
    <div>ERROR</div>
  );
}
