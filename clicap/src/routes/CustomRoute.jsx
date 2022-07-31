import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Welcome from "../components/Welcome/Welcome";
import Start from "../components/Start/Start";
import AccountActivate from "../components/AccountActivate/AccountActivate";
const CustomRoute = () => (
  <>
    <Routes>
        <Route path="/" element={<Home><Start/></Home>} />
        <Route element={<Home />} />
        <Route exact path="login" element={<Home><Login/></Home>} />
        <Route path="register" element={<Home><Register/></Home>} />
        <Route path="api/clicap/user/acount-activate/:token" element={<AccountActivate />} />
        <Route path="home" element={<PrivateRoute><Welcome/></PrivateRoute>} />
        {/* <Route path="users">
          <Route index element={<ListUser />} />
          <Route path=":userId" element={<SingleUser />} />
          <Route path="new" element={<NewUser />} />
        </Route> */}
    </Routes>
  </>
);

export default CustomRoute;
