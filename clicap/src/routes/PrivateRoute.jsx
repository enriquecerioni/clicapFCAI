import React from "react";
import { isAuthenticated } from "../helpers/helpers";

export default function PrivateRoute({ children }) {
  const auth = isAuthenticated();
  return auth ? children : <div>ERROR</div>;
}