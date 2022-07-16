import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import PrivateRoute from "./PrivateRoute";

const CustomRoute = () => (
  <>
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="login" element={<Home><Login/></Home>} />
        <Route path="register" element={<Home><Register/></Home>} />
        {/* <Route path="users">
          <Route index element={<ListUser />} />
          <Route path=":userId" element={<SingleUser />} />
          <Route path="new" element={<NewUser />} />
        </Route> */}
      </Route>
    </Routes>
  </>
);

export default CustomRoute;
