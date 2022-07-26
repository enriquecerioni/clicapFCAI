import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { reqAxios } from "../../helpers/helpers";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import "./register.css";
import Tooltip from "react-bootstrap/Tooltip";
import { alertError, alertSuccess } from "../../helpers/alerts";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate=useNavigate();
  const initialStateRegister = {
    roleId: "",
    identifyType: "",
    name: "",
    surname: "",
    email: "",
    identifyNumber: "",
    address: "",
    institution: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  };
  
  const [dataRegister, setDataRegister] = useState(initialStateRegister);
  const [roles, setRoles] = useState([]);
  const [putDisabled, setPutDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [showErrorPassEquals, setShowErrorPassEquals] = useState(false);

  const handleChangeRegister = (e) => {
    setDataRegister({
      ...dataRegister,
      [e.target.name]: e.target.value,
    });
  };
  const onlyNumbers = () => {
    const pattern = /^[0-9]+$/;
    return pattern.test(dataRegister.identifyNumber);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //valido que sean solo numeros
    const formOk = onlyNumbers();
    const passwordsEquals = dataRegister.password === dataRegister.passwordConfirm?true:false;
    if (formOk) {
      //verifico que las contraseñas sean iguales
      if (!passwordsEquals) {
        return setShowErrorPassEquals(true);
      }else{
        const data = await reqAxios('POST','/user/register','',dataRegister);
        alertSuccess(data.data.response);
        /* navigate('/login'); */
      }
    }else{
      return alertError('ID Incorrecto');
    }
  };


  const disabled = () => {
    return (
      !!!dataRegister.roleId.trim() ||
      !!!dataRegister.identifyType.trim() ||
      !!!dataRegister.identifyNumber.trim() ||
      !!!dataRegister.name.trim() ||
      !!!dataRegister.surname.trim() ||
      !!!dataRegister.email.trim() ||
      !!!dataRegister.address.trim() ||
      !!!dataRegister.institution.trim() ||
      !!!dataRegister.phone.trim() ||
      !!!dataRegister.password.trim() ||
      !!!dataRegister.passwordConfirm.trim()
    );
  };

  useEffect(() => {
    const allGets = async () => {
      const getRole = await reqAxios("GET", "/role/getall", "", "");
      setRoles(getRole.data.response);
    };
    allGets();
  }, []);

  return (
    <>
      <div className="login-view animate__animated animate__fadeInUp h-100">
        <div className="card card-login shadow w-50">
          <div className="logo-login">
            <h1>Registro</h1>
          </div>
          <div className="card-body">
            <div className="">
              <form onSubmit={handleSubmit}>
                {/* ROL */}
                <div className="mb-2">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label fw-bold"
                  >
                    Rol
                  </label>
                  <div className="">
                    <select
                      className="form-select"
                      name="roleId"
                      value={dataRegister.roleId}
                      onChange={handleChangeRegister}
                    >
                      <option value={""}>Seleccione</option>
                      {roles.map((rol) =>
                        rol.id !== 1 ? (
                          <option key={rol.id} value={rol.id}>
                            {rol.name}
                          </option>
                        ) : null
                      )}
                    </select>
                  </div>
                </div>
                <div className="row form-regis-responsive">
                  {/* TIPO DE IDENTIFICACIÓN */}
                  <div className="mb-2 col">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label fw-bold"
                    >
                      Tipo de identificación
                    </label>
                    <div className="d-flex">
                      <select
                        className="form-select"
                        name="identifyType"
                        value={dataRegister.identifyType}
                        onChange={handleChangeRegister}
                      >
                        <option value={""}>Seleccione</option>
                        <option value={"Dni"}>Dni</option>
                        <option value={"Pasaporte"}>Pasaporte</option>
                      </select>
                    </div>
                  </div>
                  {/* ID */}
                  <div className="mb-2 col">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label fw-bold"
                    >
                      Número de {dataRegister.identifyType===""?'identificación':dataRegister.identifyType}
                    </label>
                    <div className="d-flex">
                      <input
                        type="number"
                        placeholder="Ej: 30554458"
                        className="form-control"
                        name="identifyNumber"
                        value={dataRegister.identifyNumber}
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
                        value={dataRegister.name}
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
                        value={dataRegister.surname}
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
                        value={dataRegister.email}
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
                        value={dataRegister.address}
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
                        value={dataRegister.institution}
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
                        value={dataRegister.phone}
                        onChange={handleChangeRegister}
                      />
                    </div>
                  </div>
                </div>
                <div className="row form-regis-responsive">
                  {/* CONSTRASEÑA */}
                  <div className="mb-2 col">
                    <label
                      htmlFor="exampleInputEmail1"
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
                        /*  value={formLogin.password} */
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
                        value={dataRegister.passwordConfirm}
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
                  {showErrorPassEquals?
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    Las contraseñas no coinciden
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>:null}
                </div>
                <button
                  type="submit"
                  disabled={putDisabled ? putDisabled : disabled()}
                  className="btn btn-login"
                >
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
