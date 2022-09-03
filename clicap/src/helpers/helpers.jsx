import axios from "axios";
import { toast } from "react-toastify";
import { alertError, alertSuccess, loadError, loadSuccess } from "./alerts";
import { API_URL } from "./constants";
export const isAuthenticated = () => sessionStorage.getItem("user");
export const getDataUserByKey = (key) => {
  const dataUser = JSON.parse(sessionStorage.getItem("user"));
  switch (key) {
    case "id":
      return dataUser ? dataUser.id : null;
    case "roleId":
      return dataUser ? dataUser.roleId : null;
    case "name":
      return dataUser ? dataUser.name : null;
    default:
      return null;
  }
};
export const reqAxios = async (method, shortUrl, param, data) => {
  try {
    const res = await axios({
      method: method,
      url: API_URL + shortUrl,
      params: param,
      data: data,
      headers: {
        Accept: "application/JSON",
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    if (method != "get") {
      alertSuccess(res.data.msg);
    }
    return res;
  } catch (error) {
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
        "Content-Type": "multipart/form-data",
      },
    });
    if (method !== "get") {
      alertSuccess(res.data.msg);
    }
    return res;
  } catch (error) {
    console.log(error);
    alertError("Error");
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
