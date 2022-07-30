import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Welcome from "../components/Welcome/Welcome";
import AccountActivate from "../components/AccountActivate/AccountActivate";
import DeliveryTask from "../components/DeliveryTask/DeliveryTask";
import Works from "../components/Works/Works";
const CustomRoute = () => (
  <>
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="login" element={<Home><Login/></Home>} />
        <Route path="deliverytask" element={<Home><DeliveryTask/></Home>} />
        <Route path="myworks" element={<Home><Works/></Home>} />
        <Route path="register" element={<Home><Register/></Home>} />
        <Route path="api/clicap/user/acount-activate/:token" element={<AccountActivate />} />

        <Route path="home" element={<PrivateRoute><Welcome/></PrivateRoute>} />
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
