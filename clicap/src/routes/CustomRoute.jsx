import React from "react";
import { Routes, Route } from "react-router-dom"
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register"
import PrivateRoute from "./PrivateRoute"

const CustomRoute = () => (
    <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/register" element={<Register />}/>
    </Routes>
)

export default CustomRoute;