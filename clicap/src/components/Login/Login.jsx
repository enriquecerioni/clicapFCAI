import React from "react";
import { useState } from "react";
import logo from "../../assets/clicap.png";
import "./login.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { reqAxios } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { alertError } from "../../helpers/alerts";
import { ClicapTooltip } from "../ClicapTooltip/ClicapTooltip";
import { useContext } from "react";
import { AppContext } from "../../context/App/AppContext";

const Login = () => {
  const navigate = useNavigate();

  const initialStateLogin = {
    identifyNumber: "",
    password: "",
  };
  const [formLogin, setFormLogin] = useState(initialStateLogin);
  const [showPassword, setShowPassword] = useState(false);
  const [putDisabled, setPutDisabled] = useState(false);
  const { setRefreshRoleIdAndUserId } = useContext(AppContext);

  const handleChangeLogin = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formOk = onlyNumbers();
    if (formOk) {
      const data = await reqAxios("POST", "/user/login", "", formLogin);

      if (data.status && data.status === 200) {
        setRefreshRoleIdAndUserId(true);
        //Guardo la informacion del usuario en el sessionStorage
        sessionStorage.setItem("user", JSON.stringify(data.data.user));
        navigate("/home");
      } 
    }
    /* formOk ? await reqAxios('POST','/user/login','',formLogin): alertError('ID Incorrecto'); */
  };
  const onlyNumbers = () => {
    const pattern = /^[0-9]+$/;
    return pattern.test(formLogin.identifyNumber);
  };

  const disabled = () =>
    !!!formLogin.identifyNumber.trim() || !!!formLogin.password.trim();

  return (
    <>
      <div className="login-view animate__animated animate__fadeInDown">
        <div className="card card-login shadow">
          <div className="card-body">
            <h5 className="card-title text-center">Inicio de sesión</h5>
            <div className="">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label fw-bold"
                  >
                    DNI / PASAPORTE
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
                        <i
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="fa-solid fa-eye"
                        ></i>
                      ) : (
                        <i
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="fa-solid fa-eye-slash"
                        ></i>
                      )}
                    </div>
                  </div>
                </div>
                <ClicapTooltip
                  tooltip={putDisabled ? putDisabled : disabled()}
                  text={"Por favor completar ID y Contraseña"}
                >
                  <div>
                    <button
                      type="submit"
                      disabled={putDisabled ? putDisabled : disabled()}
                      className="btn btn-login"
                    >
                      Iniciar sesión
                    </button>
                  </div>
                </ClicapTooltip>
                <button
                  className="mt-2 w-100 btn btn-outline-success"
                  onClick={() => navigate("/register")}
                >
                  Registrarme
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
