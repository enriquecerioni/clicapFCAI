import React, { createContext } from "react";
import { useState } from "react";
import { reqAxios } from "../helpers/helpers";
export const EntitiesContext = createContext();

const EntitiesProvider = ({ children }) => {
  //Initial States
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
  //Registro - Editar Usuario
  const [userRegister, setUserRegister] = useState(initialStateRegister);
  const handleChangeRegister = (e) => {
    setUserRegister({
      ...userRegister,
      [e.target.name]: e.target.value,
    });
  };
  const getDataUser = async (id) => {
    const dataUser = await reqAxios("GET", `/user/get/${id}`, "", "");
    //agrego passwordConfirm al objeto porque sino despues al no existir no puede hacer la validacion en el .strim()
    dataUser.data.response.passwordConfirm = "";
    setUserRegister(dataUser.data.response);
  };
  
  //Roles
  const [roles, setRoles] = useState([]);
  const getAllRoles = async () => {
    const getRole = await reqAxios("GET", "/role/getall", "", "");
    setRoles(getRole.data.response);
  };
  return (
    <EntitiesContext.Provider
      value={{
        userRegister,
        setUserRegister,
        handleChangeRegister,
        getAllRoles,
        roles,
        getDataUser,
      }}
    >
      {children}
    </EntitiesContext.Provider>
  );
};
export default EntitiesProvider;
