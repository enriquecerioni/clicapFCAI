import React, { createContext } from "react";
import { useState } from "react";
import { formDataAxios, getDataUserByKey, reqAxios } from "../helpers/helpers";
export const EntitiesContext = createContext();

const EntitiesProvider = ({ children }) => {
  const userId = getDataUserByKey("id");
  //Estados iniciales
  //ESTADO INICIAL REGISTRO
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
  //ESTADO INICIAL PARA SUBIR TRABAJO
  const initialStateUpJob = {
    name: "",
    jobModalityId: "",
    areaId: "",
    authorId: "",
    members: "",
    urlFile: "",
    evaluatorId1: "",
    evaluatorId2: "",
  };
  //--------------------------------------------------------------
  //ESTADOS
  //REGISTRO
  const [userRegister, setUserRegister] = useState(initialStateRegister);
  //ROLES
  const [roles, setRoles] = useState([]);
  //TRABAJO
  const [job, setJob] = useState(initialStateUpJob);
  //TODOS LOS TRABAJOS
  const [allJobs, setAllJobs] = useState([]);
  //MIS TRABAJOS
  const [myJobs, setMyJobs] = useState([]);
  //UN TRABAJO
  const [jobId, setJobId] = useState([]);
  //TODOS LOS USUARIOS
  const [users, setUsers] = useState([]);

  // -----------------------------------------------------------------
  //Registro - Editar Usuario
  const handleChangeRegister = (e) => {
    setUserRegister({
      ...userRegister,
      [e.target.name]: e.target.value,
    });
  };
  const getDataUser = async (id) => {
    const dataUser = await reqAxios("GET", `/user/get/${id}`, "", "");
    //agrego passwordConfirm al objeto porque sino despues al no existir no puede hacer la validacion en el .strim()
    dataUser.data.response.passwordConfirm = dataUser.data.response.password;
    setUserRegister(dataUser.data.response);
  };

  //Roles
  const getAllRoles = async () => {
    const getRole = await reqAxios("GET", "/role/getall", "", "");
    setRoles(getRole.data.response);
  };

  //Subida de un trabajo
  const handleChangeUpJob = (e) => {
    let value =
      e.target.type === "file"
        ? e.target.value === ""
          ? ""
          : e.target.files[0]
        : e.target.value;
    if (e.target.name === "areaId") {
      value = Number(value);
    }
    setJob({
      ...job,
      [e.target.name]: value,
    });
  };
  const createNewJob = async () => {
    try {
      const bodyFormData = new FormData();
      for (const key in job) {
        bodyFormData.append(key, job[key]);
      }
      await formDataAxios("POST", `/job/create`, "", bodyFormData);
    } catch (e) {
      console.log(e);
    }
  };
  //Trabajos
  const getAllJobs = async () => {
    const getAllJob = await reqAxios("GET", "/job/getall", "", "");
    setAllJobs(getAllJob.data.response);
  };
  //Mis Trabajos / LOS TRABAJOS
  const getMyJobs = async (numPage, dataFilter) => {
    try {
      const dataMyJobs = await reqAxios(
        "GET",
        `/job/get/jobs/${numPage}`,
        dataFilter,
        ""
      );
      setMyJobs(dataMyJobs.data.response);
    } catch (e) {
      console.log(e);
    }
  };
  //Buscar un trabajo en particular
  const getJobId = async (id) => {
    try {
      const dataJobId = await reqAxios("GET", `/job/get/${id}`, "", "");
      const partners = dataJobId.data.response[0].members.split(";");
      dataJobId.data.response[0].members = partners;
      setJobId(dataJobId.data.response[0]);
    } catch (e) {
      console.log(e);
    }
  };
  //Areas
  const [areas, setAreas] = useState([]);
  const getAllAreas = async () => {
    const getAllArea = await reqAxios("GET", "/area/getall", "", "");
    setAreas(getAllArea.data.response);
  };
  //Modalidades
  const [modalities, setModalities] = useState([]);
  const getAllmodalities = async () => {
    const getAllmodalities = await reqAxios(
      "GET",
      "/jobmodality/getall",
      "",
      ""
    );
    setModalities(getAllmodalities.data.response);
  };
  //Usuarios
  const getAllUsers = async () => {
    const getAllUser = await reqAxios("GET", "/user/getall", "", "");
    setUsers(getAllUser.data.response);
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
        job,
        handleChangeUpJob,
        createNewJob,
        areas,
        getAllAreas,
        allJobs,
        getAllJobs,
        users,
        getAllUsers,
        myJobs,
        getMyJobs,
        modalities,
        getAllmodalities,
        getJobId,
        jobId,
      }}
    >
      {children}
    </EntitiesContext.Provider>
  );
};
export default EntitiesProvider;
