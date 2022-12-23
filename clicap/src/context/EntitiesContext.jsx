import React, { createContext } from "react";
import { useState } from "react";
import {
  formDataAxios,
  getDataUserByKey,
  reqAxios,
  waitAndRefresh,
} from "../helpers/helpers";
export const EntitiesContext = createContext();

const EntitiesProvider = ({ children }) => {
  const userId = getDataUserByKey("id");
  const roleId = getDataUserByKey("roleId");
  //Estados iniciales
  //Estado inicial cuenta regresiva
  const [time, setTime] = useState("2022-11-12");
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
    authorId: userId,
    status: 0,
    members: "",
    urlFile: "",
    evaluatorId1: "",
    evaluatorId2: "",
  };

  const initialStatePay = {
    amount: "",
    moneyType: "",
    payType: "",
    cuitCuil: "",
    iva: "",
    detail: "",
    urlFile: "",
    authorId: userId,
  };

  const initialStateNew = {
    title: "",
    content: "",
    urlFile: ""
  };

  const initialStateArea = {
    name: ""
  };

  const initialStateCertificate = {
    detail: "",
    urlFile: "",
    authorId: userId,
  };
  //ESTADO INICIAL DE UNA CORRECCION
  const initialCorrection = {
    jobId: "",
    correctionId: 0,
    evaluatorId: userId,
    details: "",
    sendMail: 0,
  };
  const allStatusJob = [
    { label: "Aceptado", value: 1, target: { name: "status", value: 1 } },
    {
      label: "Aceptado con modificaciones Menores",
      value: 2,
      target: { name: "status", value: 2 },
    },
    {
      label: "Aceptado con modificaciones mayores",
      value: 3,
      target: { name: "status", value: 3 },
    },
    { label: "No aceptado", value: 4, target: { name: "status", value: 4 } },
  ];
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
  const [totalPages, setTotalPages] = useState("");
  //MIS TRABAJOS
  const [myJobs, setMyJobs] = useState([]);
  //UN TRABAJO
  const [jobId, setJobId] = useState([]);
  //TODOS LOS USUARIOS
  const [usersFiltered, setUsersFiltered] = useState([]);
  const [totalUsersPages, setTotalUsersPages] = useState("");
  const [users, setUsers] = useState([]);
  const [usersSelector, setUsersSelector] = useState([]);
  //TODOS LOS EVALUADORES
  const [allEvaluators, setAllEvaluators] = useState([]);
  const [allEvaluatorsSelector, setAllEvaluatorsSelector] = useState([]);

  //Areas
  const [area, setArea] = useState([]);
  const [areas, setAreas] = useState([]);
  const [areasSelector, setAreasSelector] = useState([]);
  //CORRECCIONES
  const [correction, setCorrection] = useState(initialCorrection);
  const [corrections, setCorrections] = useState([]);
  const [myPays, setMyPays] = useState([]);
  //MIS CERTIFICADOS
  const [myCertificates, setMyCertificates] = useState([]);
  //TODOS LOS PAGOS
  const [pay, setPay] = useState(initialStatePay);
  const [allPays, setAllPays] = useState([]);
  // NOVEDADES
  const [news, setNews] = useState(initialStateNew);
  const [allNews, setAllNews] = useState([]);
  //PAGO
  const [certificate, setCertificate] = useState(initialStateCertificate);
  //Modalidades
  const [modalities, setModalities] = useState([]);

  // -----------------------------------------------------------------
  // Fecha - Obtener Fecha
  const getDate = async () => {
    const obj = await reqAxios("GET", "/date/get", "", "");
    setTime(await obj.data.response.date);
  };

  const handleTime = async (event) => {
    let date = event.target.value;
    await reqAxios("PUT", `/date/edit/${date}`, "", "");
    window.location.reload();
    // console.log(date);
    // date = date.split('-');
    // let timestamp = new Date(date[0], date[1] - 1, date[2]);
    // console.log(timestamp.getTime());
  };
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
      console.log(bodyFormData);
      await formDataAxios("POST", `/job/create`, "", bodyFormData);
    } catch (e) {
      console.log(e);
    }
  };
  //Trabajos
  const getAllJobs = async (page, params) => {
    const getAllJob = await reqAxios(
      "GET",
      `/job/get/jobs/${page}`,
      params,
      ""
    );
    setAllJobs(getAllJob.data.response);
    setTotalPages(getAllJob.data.pages);
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
      /*  const partners = dataJobId.data.response[0].members.split(";");
      dataJobId.data.response[0].members = partners;
      console.log(dataJobId.data.response); */
      setJobId(dataJobId.data.response[0]);
    } catch (error) {
      console.log(error);
    }
  };
  //Subida de un pago
  const handleChangePay = (e) => {
    let value =
      e.target.type === "file"
        ? e.target.value === ""
          ? ""
          : e.target.files[0]
        : e.target.value;
    setPay({
      ...pay,
      [e.target.name]: value,
    });
  };
  const createNewPay = async () => {
    try {
      const bodyFormData = new FormData();
      for (const key in pay) {
        bodyFormData.append(key, pay[key]);
      }
      await formDataAxios("POST", `/pay/create`, "", bodyFormData);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangeNew = (e) => {
    let value =
      e.target.type === "file"
        ? e.target.value === ""
          ? ""
          : e.target.files[0]
        : e.target.value;
    setNews({
      ...news,
      [e.target.name]: value,
    });
  };

  const handleChangeArea = (e) => {
    setArea({
      ...area,
      [e.target.name]: e.target.value,
    });
  };

  const createNewNew = async () => {
    try {
      const bodyFormData = new FormData();
      for (const key in news) {
        bodyFormData.append(key, news[key]);
      }
      await formDataAxios("POST", `/new/create`, "", bodyFormData);
      setNews(initialStateNew);
    } catch (e) {
      console.log(e);
    }
  };

  const createNewArea = async () => {
    try {
      await reqAxios("POST", `/area/create`, "", area);
      setArea(initialStateArea);
    } catch (e) {
      console.log(e);
    }
  };

  const updatePayInvoice = async (id) => {
    try {
      const bodyFormData = new FormData();
      for (const key in pay) {
        bodyFormData.append(key, pay[key]);
      }
      await formDataAxios("POST", `/pay/edit/invoice/${id}`, "", bodyFormData);
      waitAndRefresh(`/pays`, 1000);
    } catch (e) {
      console.log(e);
    }
  };

  //Subida de un certificado
  const handleChangeCertificate = (e) => {
    let value =
      e.target.type === "file"
        ? e.target.value === ""
          ? ""
          : e.target.files[0]
        : e.target.value;
    setCertificate({
      ...certificate,
      [e.target.name]: value,
    });
  };
  const createNewCertificate = async () => {
    try {
      const bodyFormData = new FormData();
      for (const key in certificate) {
        bodyFormData.append(key, certificate[key]);
      }
      await formDataAxios("POST", `/student/create`, "", bodyFormData);
    } catch (e) {
      console.log(e);
    }
  };
  //Buscar las correciones de un trabajo
  const getCorrectionsByJob = async (id) => {
    const params = { roleId, evaluatorId: userId };
    try {
      const corrections = await reqAxios(
        "GET",
        `/jobdetails/get/${id}`,
        params,
        ""
      );
      setCorrections(corrections.data.response);
    } catch (error) {
      console.log(error);
    }
  };
  const getCorrectionByJob = async (id) => {
    const params = { roleId, evaluatorId: null };
    try {
      const corrections = await reqAxios(
        "GET",
        `/jobdetails/get/${id}`,
        params,
        ""
      );
      setCorrection(corrections.data.response[0]);
    } catch (error) {
      console.log(error);
    }
  };
  //Pagos
  const getAllPays = async () => {
    const getAllPay = await reqAxios("GET", "/pay/getall", "", "");
    setAllPays(getAllPay.data.response);
  };

  //Novedades
  const getAllNews = async () => {
    const getAllNew = await reqAxios("GET", "/new/getall", "", "");
    setAllNews(getAllNew.data.response.reverse());
  };

  //Mis Pagos
  const getMyPays = async (numPage, dataFilter) => {
    try {
      const dataMyPays = await reqAxios(
        "GET",
        `/pay/get/pay/${numPage}`,
        dataFilter,
        ""
      );
      setMyPays(dataMyPays.data.response);
    } catch (e) {
      console.log(e);
    }
  };
  //Mis Certificados
  const getMyCertificates = async (numPage, dataFilter) => {
    try {
      const dataMyCertificates = await reqAxios(
        "GET",
        `/student/get/certificate/${numPage}`,
        dataFilter,
        ""
      );
      setMyCertificates(dataMyCertificates.data.response);
    } catch (e) {
      console.log(e);
    }
  };

  //Areas
  const getAllAreas = async () => {
    const getAllArea = await reqAxios("GET", "/area/getall", "", "");
    setAreas(getAllArea.data.response);
    const array = [];
    getAllArea.data.response.map((item, i) => {
      array.push({
        label: item.name,
        value: item.id,
        target: { name: "areaId", value: item.id },
      });
    });
    setAreasSelector(array);
  };

  const getAllModalities = async () => {
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
    const array = [];
    getAllUser.data.response.map((item, i) => {
      array.push({
        label: item.name + " " + item.surname,
        value: item.id,
        target: { name: "authorId", value: item.id },
      });
    });
    setUsersSelector(array);
  };
  const getAllEvaluators = async () => {
    const allEvaluators = await reqAxios(
      "GET",
      "/user/getallevaluators",
      "",
      ""
    );
    setAllEvaluators(allEvaluators.data.response);
    const array = [];
    allEvaluators.data.response.map((item, i) => {
      array.push({
        label: item.name + " " + item.surname,
        value: item.id,
        target: { name: "evaluatorId", value: item.id },
      });
    });
    setAllEvaluatorsSelector(array);
  };
  const getUsersFiltered = async (page, params) => {
    const getAllJob = await reqAxios(
      "get",
      `/user/get/users/${page}`,
      params,
      ""
    );
    setUsersFiltered(getAllJob.data.response);
    setTotalUsersPages(getAllJob.data.pages);
  };
  return (
    <EntitiesContext.Provider
      value={{
        time,
        setTime,
        getDate,
        handleTime,
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
        usersFiltered,
        totalUsersPages,
        getUsersFiltered,
        users,
        getAllUsers,
        myJobs,
        getMyJobs,
        myPays,
        pay,
        createNewPay,
        allPays,
        getAllPays,
        handleChangePay,
        getMyPays,
        certificate,
        myCertificates,
        getMyCertificates,
        handleChangeCertificate,
        createNewCertificate,
        modalities,
        getAllModalities,
        updatePayInvoice,

        getJobId,
        jobId,
        usersSelector,
        areasSelector,
        totalPages,
        getCorrectionsByJob,
        getCorrectionByJob,
        corrections,
        correction,
        setCorrection,
        allStatusJob,
        getAllEvaluators,
        allEvaluators,
        allEvaluatorsSelector,
        getAllNews,
        createNewNew,
        allNews,
        news,
        handleChangeNew,
        createNewArea,
        handleChangeArea,
        area
      }}
    >
      {children}
    </EntitiesContext.Provider>
  );
};
export default EntitiesProvider;
