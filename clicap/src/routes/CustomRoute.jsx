import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Welcome from "../components/Welcome/Welcome";
import Start from "../components/Start/Start";
import AccountActivate from "../components/AccountActivate/AccountActivate";
import DeliveryTask from "../components/DeliveryTask/DeliveryTask";
import JobsAdmin from "../components/Jobs/JobsAdmin/JobsAdmin";
import Users from "../components/Users/Users";
import Sidebar from "../components/Sidebar/SideBar";
const CustomRoute = () => (
  <>
    <Routes>
        <Route path="/" element={<Home><Start/></Home>} />
        <Route element={<Home />} />
        <Route path="login" element={<Home><Login/></Home>} />
        <Route path="deliverytask" element={<Home><Sidebar/><DeliveryTask/></Home>} />
        <Route path="works" element={<Home><Sidebar/><JobsAdmin/></Home>} />
        <Route path="users" element={<Home><Sidebar/><Users/></Home>} />
        <Route path="register" element={<Home><Register/></Home>} />
        <Route path="api/clicap/user/acount-activate/:token" element={<AccountActivate />} />
        <Route path="home" element={<PrivateRoute><Sidebar/><Welcome/></PrivateRoute>} />
        <Route path="user/edit/:id" element={<PrivateRoute><Register/></PrivateRoute>} />
        {/* <Route path="users">
          <Route index element={<ListUser />} />
          <Route path=":userId" element={<SingleUser />} />
          <Route path="new" element={<NewUser />} />
        </Route> */}
    </Routes>
  </>
);

export default CustomRoute;
