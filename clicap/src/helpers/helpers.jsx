import axios from "axios";
import {API_URL} from './constants'
export const isAuthenticated = () => sessionStorage.getItem("user");
export const getDataUserByKey = (key) => {
  const dataUser = JSON.parse(sessionStorage.getItem("user"));
  switch (key) {
    case "id":
      return dataUser ? dataUser.userId : null;
    case "name":
      return dataUser ? dataUser.first_name : null;
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
/*     if (method != "get") {
      alertSuccess(res.data.msg);
    } */
    return console.log(res.data);
  } catch (error) {
    console.log(error);
/*     alertError("Error"); */
  }
};
