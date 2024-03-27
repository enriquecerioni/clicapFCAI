import axios from "axios";
import { toast } from "react-toastify";
import { alertError, alertSuccess, loadError, loadSuccess } from "./alerts";
import { API_URL, URL_HOME } from "./constants";
import { format, addDays } from "date-fns";
export const isAuthenticated = () => sessionStorage.getItem("user");

export const getDataUserByKey = (key) => {
  const dataUser = JSON.parse(sessionStorage.getItem("user"));
  return dataUser && dataUser[key] ? dataUser[key] : null;
};

export const getUserToken = () => {
  const dataUser = sessionStorage.getItem("token");
  return dataUser ? dataUser.replace(/^"(.*)"$/, "$1") : null;
};

export const reqAxios = async (method, shortUrl, param, data) => {
  try {
    const res = await axios({
      method: method,
      url: API_URL + shortUrl,
      params: param,
      data: data,
      headers: {
        "auth-token": getUserToken(),
        /* "Content-Type": "application/json", */
      },
    });

    if (res.status && res.status === 200) {
      if (method !== "get") {
        alertSuccess(res.data.msg);
      }
      return res;
    }
  } catch (error) {
    if (error.response.status === 401) {
      console.log(error);
      sessionStorage.clear();
      alertError("La sesión expiró");
      return setTimeout(() => (window.location.href = URL_HOME), 3000);
    }

    if (error.response.status === 404) {
      console.log(error);
      return alertError("Error al conectar con el servidor");
    }

    alertError(error.response.data.msg, false);
    return error;
  }
};

export const formDataAxios = async (method, shortUrl, param, data) => {
  try {
    const res = await axios({
      method: method,
      url: API_URL + shortUrl,
      params: param,
      data: data,
      headers: {
        "auth-token": getUserToken(),
        "Content-Type": "multipart/form-data",
      },
    });
    if (method !== "get") {
      alertSuccess(res.data.msg);
    }
    return res;
  } catch (error) {
    alertError(error.response.data.msg, false);
  }
};
export const deleteAxios = async (shortUrl) => {
  const load = toast.loading("Espere unos segundos...");
  try {
    const res = await axios({
      method: "DELETE",
      url: API_URL + shortUrl,
      headers: {
        Accept: "application/JSON",
        "auth-token": getUserToken(),
        "Content-Type": "application/json",
      },
    });
    toast.update(load, loadSuccess(res.data));
    return res;
  } catch (error) {
    console.log(error.response.data);
    return toast.update(load, loadError(error.response.data));
  }
};
export const waitAndRefresh = (path, time) => {
  setTimeout(() => {
    window.location.pathname = path;
  }, time);
};

export const downloadFile = async (nameFile, folder) => {
  try {
    await axios({
      url: `${API_URL}/job/downloadfile?nameFile=${nameFile}&folder=${folder}`,
      params: "",
      method: "GET",
      responseType: "blob",
      headers: {
        "auth-token": getUserToken(),
      },
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${nameFile}`);
      document.body.appendChild(link);
      link.click();
    });
    return "Descargado";
  } catch (error) {
    console.log(error);
  }
};

export const deleteFile = async (nameFile, folder) => {
  try {
    await axios({
      url: `${API_URL}/file/delete-file?nameFile=${nameFile}&folder=${folder}`,
      params: "",
      method: "GET",
      responseType: "blob",
    });
  } catch (error) {
    console.log(error);
  }
};

//Export in excel
export const reqAxiosDownload = async (shortUrl, param, nameFile) => {
  const load = toast.loading("Espere unos segundos...");
  try {
    await axios({
      url: API_URL + shortUrl,
      params: param,
      method: "GET",
      responseType: "blob",
      headers: {
        "auth-token": getUserToken(),
        Accept: "application/JSON",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${nameFile}.xlsx`);
      document.body.appendChild(link);
      link.click();
    });
    return toast.update(load, loadSuccess("Datos descargados"));
  } catch (error) {
    console.log(error);
  }
};

export const formatDate = (date) => {
  const hasDate = date && true;
  if (hasDate) {
    const currentDate = new Date(date);
    const validDate = addDays(currentDate, 1);
    return format(validDate, "dd/MM/yyyy");
  }
  return "Esperando correción";
};

export const evaluateDate = (date, deadlineDays = 30) => {
  const today = new Date();
  const eventDate = new Date(date);

  // Calcula la diferencia en milisegundos
  const differenceInMs = eventDate - today;

  // Convierte la diferencia a días
  const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

  // Verifica si la diferencia es mayor o igual a 30 días
  return differenceInDays >= deadlineDays;
};
