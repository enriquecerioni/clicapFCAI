import React from "react";
import Home from "../components/Home/Home";
import { isAuthenticated } from "../helpers/helpers";

export default function PrivateRoute({ children }) {
  const auth = isAuthenticated();
  return auth ? <Home> {children} </Home>: <div>ERROR</div>;
}