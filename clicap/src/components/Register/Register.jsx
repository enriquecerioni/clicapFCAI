import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
import {
  getDataUserByKey,
  isAuthenticated,
  reqAxios,
} from "../../helpers/helpers";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import "./register.css";
import Tooltip from "react-bootstrap/Tooltip";
import { alertError } from "../../helpers/alerts";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/User/UserContext";
import { RegisterContext } from "../../context/Register/RegisterContext";
import { ClicapTooltip } from "../ClicapTooltip/ClicapTooltip";

const Register = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const roleId = getDataUserByKey("roleId");

  const { getAllRoles, editUser, createUser, registerState } =
    useContext(RegisterContext);
  const { rolesSelector } = registerState;

  const { userState, getUserData } = useContext(UserContext);
  const { userData } = userState;

  const [userRegister, setUserRegister] = useState(userData);
  const [putDisabled, setPutDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const isAdmin = getDataUserByKey("roleId");
  const isEditForm = window.location.pathname === `/user/edit/${id}`;

  const identifyTypeOptions = [
    {
      label: "DNI",
      value: "DNI",
      target: { name: "identifyType", value: "DNI" },
    },
    {
      label: "Pasaporte",
      value: "Pasaporte",
      target: { name: "identifyType", value: "Pasaporte" },
    },
  ];

  const handleChangeRegister = (e, name) => {
    if (e) {
      setUserRegister({
        ...userRegister,
        [e.target.name]: e.target.value,
      });
    } else {
      setUserRegister({
        ...userRegister,
        [name]: "",
      });
    }
  };

  const onlyNumbers = () => {
    const pattern = /^[0-9]+$/;
    return pattern.test(userRegister.identifyNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //valido que sean solo numeros
    const formOk = onlyNumbers();
    const passwordsEquals =
      userRegister.password === userRegister.passwordConfirm ? true : false;
    if (formOk) {
      //verifico que las contraseñas sean iguales
      if (!passwordsEquals) {
        return alertError("Las contraseñas no coinciden");
      } else {
        if (isEditForm) {
          await editUser(userRegister);
          navigate("/home");
        } else {
          createUser(userRegister);
          navigate("/login");
        }
      }
    } else {
      return alertError("ID Incorrecto");
    }
  };

  const disabled = () => {
    return (
      !!!userRegister.roleId ||
      !!!userRegister.identifyType.trim() ||
      !!!userRegister.identifyNumber ||
      !!!userRegister.name.trim() ||
      !!!userRegister.surname.trim() ||
      !!!userRegister.email.trim() ||
      !!!userRegister.address.trim() ||
      !!!userRegister.institution.trim() ||
      !!!userRegister.phone ||
      !!!userRegister.password.trim() ||
      !!!userRegister.passwordConfirm.trim()
    );
  };

  const rolesOptions = () => {
    if (rolesSelector.length > 0) {
      if (roleId === 1) {
        return rolesSelector;
      }
      return rolesSelector.filter(
        (role) => role.value !== 1 && role.value !== 2
      );
    }
  };

  useEffect(() => {
    getAllRoles();
    if (isAuthenticated()) {
      getUserData(id);
    }
  }, []);

  useEffect(() => {
    setUserRegister(userData);
  }, [userData]);

  return (
    <>
      <div className="login-view animate__animated animate__fadeInUp">
        <div className="card card-login boxcard-register-responsive shadow ">
          <div className="logo-login">
            <h1>{isAdmin && isEditForm ? "Editar usuario" : "Registro"}</h1>
          </div>
          <div className="card-body">
            <div className="">
              <form onSubmit={handleSubmit}>
                {/* ROL */}
                {isAdmin === 1 || isAdmin === null ? (
                  <div className="mb-2">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label fw-bold"
                    >
                      Rol
                    </label>
                    <Select
                      options={rolesOptions()}
                      placeholder={"Seleccione..."}
                      name="roleId"
                      value={rolesSelector.filter(
                        (role) => role.value === userRegister.roleId
                      )}
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary: "#3D84A8",
                        },
                      })}
                      onChange={(e) => handleChangeRegister(e, "roleId")}
                    />
                  </div>
                ) : null}
                <div className="row form-regis-responsive">
                  {/* TIPO DE IDENTIFICACIÓN */}
                  <div className="mb-2 col">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label fw-bold"
                    >
                      Tipo de identificación
                    </label>
                    <Select
                      options={identifyTypeOptions}
                      placeholder={"Seleccione..."}
                      name="identifyType"
                      value={identifyTypeOptions.filter(
                        (type) => type.value === userRegister.identifyType
                      )}
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary: "#3D84A8",
                        },
                      })}
                      onChange={(e) => handleChangeRegister(e, "identifyType")}
                    />
                  </div>
                  {/* ID */}
                  <div className="mb-2 col">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label fw-bold"
                    >
                      Número de{" "}
                      {userRegister.identifyType === ""
                        ? "identificación"
                        : userRegister.identifyType}
                    </label>
                    <div className="d-flex">
                      <input
                        type="number"
                        placeholder="Ej: 30554458"
                        className="form-control"
                        name="identifyNumber"
                        value={userRegister.identifyNumber}
                        onChange={handleChangeRegister}
                      />
                      <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-right">
                            Sólo números, no se permiten símbolos.
                          </Tooltip>
                        }
                      >
                        <div className="center-center ms-1">
                          <i className="fa-solid fa-circle-info"></i>
                        </div>
                      </OverlayTrigger>
                    </div>
                  </div>
                </div>
                <div className="row form-regis-responsive">
                  {/* NOMBRE */}
                  <div className="mb-2 col">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label fw-bold"
                    >
                      Nombre
                    </label>
                    <div className="">
                      <input
                        type="text"
                        placeholder="Nombre"
                        className="form-control"
                        name="name"
                        value={userRegister.name}
                        onChange={handleChangeRegister}
                      />
                    </div>
                  </div>
                  {/* APELLIDO */}
                  <div className="mb-2 col">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label fw-bold"
                    >
                      Apellido
                    </label>
                    <div className="">
                      <input
                        type="text"
                        placeholder="Apellido"
                        className="form-control"
                        name="surname"
                        value={userRegister.surname}
                        onChange={handleChangeRegister}
                      />
                    </div>
                  </div>
                </div>
                <div className="row form-regis-responsive">
                  {/* EMAIL */}
                  <div className="mb-2 col">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label fw-bold"
                    >
                      Email
                    </label>
                    <div className="d-flex">
                      <input
                        type="email"
                        placeholder="Email"
                        className="form-control"
                        name="email"
                        value={userRegister.email}
                        onChange={handleChangeRegister}
                      />
                    </div>
                  </div>
                  {/* Dirección */}
                  <div className="mb-2 col">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label fw-bold"
                    >
                      Dirección y número
                    </label>
                    <div className="">
                      <input
                        type="text"
                        placeholder="Dirección y Nº"
                        className="form-control"
                        name="address"
                        value={userRegister.address}
                        onChange={handleChangeRegister}
                      />
                    </div>
                  </div>
                </div>
                <div className="row form-regis-responsive">
                  {/* INSTITUCIÓN */}
                  <div className="mb-2 col">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label fw-bold"
                    >
                      Institución
                    </label>
                    <div className="">
                      <input
                        type="text"
                        placeholder="Institución"
                        className="form-control"
                        name="institution"
                        value={userRegister.institution}
                        onChange={handleChangeRegister}
                      />
                    </div>
                  </div>
                  {/* CELULAR */}
                  <div className="mb-2 col">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label fw-bold"
                    >
                      Celular
                    </label>
                    <div className="">
                      <input
                        type="text"
                        placeholder="Numero de celular"
                        className="form-control"
                        name="phone"
                        value={userRegister.phone}
                        onChange={handleChangeRegister}
                      />
                    </div>
                  </div>
                </div>
                <div className="row form-regis-responsive">
                  {/* CONSTRASEÑA */}
                  <div className="mb-2 col">
                    <div className="d-flex">
                      <OverlayTrigger
                        placement="left"
                        overlay={
                          <Tooltip id="tooltip-right">
                            La contraseña se encuentra encriptada.Si desea
                            cambiarla puede hacerlo.
                          </Tooltip>
                        }
                      >
                        <div className=" ms-1 me-2">
                          <i className="fa-solid fa-circle-info"></i>
                        </div>
                      </OverlayTrigger>
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label fw-bold"
                      >
                        Contraseña
                      </label>
                    </div>
                    <div className="d-flex">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Contraseña"
                        className="form-control"
                        name="password"
                        value={userRegister.password}
                        onChange={handleChangeRegister}
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
                  {/* CONTRASEÑA CONFIRM */}
                  <div className="mb-2 col">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label fw-bold"
                    >
                      Confirmar contraseña
                    </label>
                    <div className="d-flex">
                      <input
                        type={showPasswordConfirm ? "text" : "password"}
                        placeholder="Contraseña"
                        className="form-control"
                        name="passwordConfirm"
                        value={userRegister.passwordConfirm}
                        onChange={handleChangeRegister}
                      />
                      <div className="center-center ms-1">
                        {showPasswordConfirm ? (
                          <i
                            type="button"
                            onClick={() =>
                              setShowPasswordConfirm(!showPasswordConfirm)
                            }
                            className="fa-solid fa-eye"
                          ></i>
                        ) : (
                          <i
                            type="button"
                            onClick={() =>
                              setShowPasswordConfirm(!showPasswordConfirm)
                            }
                            className="fa-solid fa-eye-slash"
                          ></i>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <ClicapTooltip
                  tooltip={putDisabled ? putDisabled : disabled()}
                  text={"Por favor completar todos los campos"}
                >
                  <div>
                    <button
                      type="submit"
                      disabled={putDisabled ? putDisabled : disabled()}
                      className="btn btn-login"
                    >
                      Enviar
                    </button>
                  </div>
                </ClicapTooltip>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
