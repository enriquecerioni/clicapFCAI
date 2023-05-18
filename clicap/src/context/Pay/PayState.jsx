import { useReducer } from "react";
import {
  formDataAxios,
  getDataUserByKey,
  reqAxios,
} from "../../helpers/helpers";
import PayReducer from "./PayReducer";
import { PayContext } from "./PayContext";

export const PayState = ({ children }) => {
  const userId = getDataUserByKey("id");
  const initialState = {
    payData: {
      amount: "",
      moneyType: "",
      payType: "",
      cuitCuil: "",
      iva: "",
      detail: "",
      urlFile: "",
      authorId: userId,
    },
    pays: [],
    isFetching: true,
  };
  const [state, dispatch] = useReducer(PayReducer, initialState);

  const createNewPay = async (pay) => {
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
  const getAllPays = async (numPage, dataFilter) => {
    try {
      const dataMyPays = await reqAxios(
        "GET",
        `/pay/get/pay/${numPage}`,
        dataFilter,
        ""
      );
      dispatch({
        type: "SET_PAYS",
        payload: dataMyPays.data.response,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const getPaysFiltered = async (page, params) => {
    try {
      const getPays = await reqAxios(
        "get",
        `/pay/get/pays/${page}`,
        params,
        ""
      );
      dispatch({
        type: "SET_PAYS",
        payload: getPays.data.response,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const getAllPaysToAdmin = async () => {
    const getAllPay = await reqAxios("GET", "/pay/getall", "", "");
    dispatch({
      type: "SET_PAYS",
      payload: getAllPay.data.response,
    });
  };

  return (
    <PayContext.Provider
      value={{
        payState: state,
        createNewPay,
        getAllPays,
        getAllPaysToAdmin,
        getPaysFiltered,
      }}
    >
      {children}
    </PayContext.Provider>
  );
};
