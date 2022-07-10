import React from "react";
import { useState } from "react";
import logo from "../../assets/logo-prueba.png";
import "./login.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {reqAxios} from '../../helpers/helpers';

const Login = () => {
  const initialStateLogin = {
    identifyNumber: "",
    password: "",
  };
  const [formLogin, setFormLogin] = useState(initialStateLogin);
  const [showPassword, setShowPassword] = useState(false);
  const [putDisabled, setPutDisabled] = useState(false);

  const handleChangeLogin = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    const formOk = onlyNumbers();
    formOk ? await reqAxios('POST','/user/login','',formLogin): console.log("error");
  };
  const onlyNumbers = () => {
    const pattern = /^[0-9]+$/;
    return pattern.test(formLogin.identifyNumber);
  };

  const disabled = () =>
    formLogin.identifyNumber.trim() == "" || formLogin.password.trim() == ""
      ? true
      : false;
  return (
    <>
      <div className="login-view animate__animated animate__fadeInDown">
        <div className="card card-login shadow">
          <div className="logo-login">
            <img src={logo} alt="Logo" />
          </div>
          <div className="card-body">
            <h5 className="card-title text-center">Inicio de sesión</h5>
            <div className="box-loginform">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label fw-bold"
                  >
                    ID
                  </label>
                  <div className="d-flex">
                    <input
                      type="number"
                      placeholder="Número de identificación"
                      className="form-control"
                      name="identifyNumber"
                      value={formLogin.identifyNumber}
                      onChange={handleChangeLogin}
                    />
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip id="tooltip-right">
                          Sólo numeros, no se permiten símbolos.
                        </Tooltip>
                      }
                    >
                      <div className="center-center ms-1">
                        <i className="fa-solid fa-circle-info"></i>
                      </div>
                    </OverlayTrigger>
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label fw-bold"
                  >
                    Contraseña
                  </label>
                  <div className="d-flex">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Contraseña"
                      className="form-control"
                      name="password"
                      value={formLogin.password}
                      onChange={handleChangeLogin}
                    />
                    <div className="center-center ms-1">
                        {showPassword ? (
                          <i type="button" onClick={() => setShowPassword(!showPassword)} className="fa-solid fa-eye"></i>
                        ) : (
                          <i type="button" onClick={() => setShowPassword(!showPassword)} className="fa-solid fa-eye-slash"></i>
                        )}
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={putDisabled ? putDisabled : disabled()}
                  className="btn btn-login"
                >
                  Iniciar sesión
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
