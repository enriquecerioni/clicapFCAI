import "../App.css";
import { toast } from "react-toastify";

//devuelven la config de una alerta
export const loadSuccess = (msg) => {
  return {
    render: msg,
    type: "success",
    isLoading: false,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
};
export const loadError = (msg) => {
  return {
    render: msg,
    type: "error",
    isLoading: false,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
}
//alertas
export const alertSuccess=(msg)=>{
  return toast(msg, {
  position: "top-right",
  type: "success",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  });
}
export const alertError=(msg)=>{
  return toast(msg, {
  position: "top-right",
  type: "error",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  });
}