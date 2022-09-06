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
    authorId: userId,
    members: "",
    urlFile: "",
    evaluatorId1: "",
    evaluatorId2: "",
  };

  //ESTADO INICIAL PARA SUBIR TRABAJO
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

  //ESTADO INICIAL PARA SUBIR TRABAJO
  const initialStateCertificate = {
    detail: "",
    urlFile: "",
    authorId: userId,
  };
  //--------------------------------------------------------------
  //ESTADOS
  //REGISTRO
  const [userRegister, setUserRegister] = useState(initialStateRegister);
  //ROLES
  const [roles, setRoles] = useState([]);
  //TRABAJO
  const [job, setJob] = useState(initialStateUpJob);
  //PAGO
  const [pay, setPay] = useState(initialStatePay);
  //PAGO
  const [certificate, setCertificate] = useState(initialStateCertificate);
  //TODOS LOS TRABAJOS
  const [allJobs, setAllJobs] = useState([]);
  const [totalPages, setTotalPages] = useState("");
  //MIS TRABAJOS
  const [myJobs, setMyJobs] = useState([]);
  //UN TRABAJO
  const [jobId, setJobId] = useState([]);
  //MIS PAGOS
  const [myPays, setMyPays] = useState([]);
  //MIS CERTIFICADOS
  const [myCertificates, setMyCertificates] = useState([]);
  //TODOS LOS PAGOS
  const [allPays, setAllPays] = useState([]);
  //TODOS LOS USUARIOS
  const [users, setUsers] = useState([]);
  const [usersSelector, setUsersSelector] = useState([]);
  //Areas
  const [areas, setAreas] = useState([]);
  const [areasSelector, setAreasSelector] = useState([]);
  //CORRECCIONES
  const [corrections, setCorrections] = useState([]);

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
      const partners = dataJobId.data.response[0].members.split(";");
      dataJobId.data.response[0].members = partners;
      setJobId(dataJobId.data.response[0]);
    } catch (error) {
      console.log(error);
    }

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
      try {
        const corrections = await reqAxios(
          "GET",
          `/jobdetails/get?jobId=${id}`,
          "",
          ""
        );
        setCorrections(corrections.data.response);
      } catch (error) {
        console.log(error);
      }
    };
    //Pagos
    const getAllPays = async () => {
      const getAllPay = await reqAxios("GET", "/pay/getall", "", "");
      setAllPays(getAllPay.data.response);
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
          getAllmodalities,
          getJobId,
          jobId,
          usersSelector,
          areasSelector,
          totalPages,
          getCorrectionsByJob,
          corrections,
        }}
      >
        {children}
      </EntitiesContext.Provider>
    );
  };
};
export default EntitiesProvider;
