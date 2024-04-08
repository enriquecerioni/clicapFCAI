import { useReducer } from "react";
import {
  formDataAxios,
  getDataUserByKey,
  reqAxios,
  waitAndRefresh,
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
      invoice: "",
    },
    paysFilter: {
      authorId: "",
    },
    totalPaysPages: 0,
    pays: [],
    refreshPays: false,
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

      dispatch({
        type: "SET_REFRESH_PAYS",
        payload: !state.refreshPays,
      });
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
        payload: {
          pays: dataMyPays.data.response,
          totalPaysPages: dataMyPays.data.pages,
        },
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
        payload: {
          pays: getPays.data.response,
          totalPages: getPays.data.pages,
        },
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

  const getPayByAuthorId = async (authorId) => {
    const getAuthorPay = await reqAxios(
      "GET",
      `/pay/get/author/${authorId}`,
      "",
      ""
    );
    return getAuthorPay.data.response;
  };

  const getPayById = async (payId) => {
    try {
      const pay = await reqAxios(
        "GET",
        `/pay/get/${payId}`,
        "",
        ""
      );
      dispatch({
        type: "SET_PAY",
        payload: pay.data.response,
      })
    } catch (error) {
        console.log(error);
    }
  };

  const createPayInvoice = async (id, invoice) => {
    try {
      const bodyFormData = new FormData();
      for (const key in invoice) {
        bodyFormData.append(key, invoice[key]);
      }
      await formDataAxios("POST", `/pay/edit/invoice/${id}`, "", bodyFormData);
    } catch (e) {
      console.log(e);
    }
  };
  const setUserIdToPays = () => {
    dispatch({
      type: "SET_USERID",
      payload: getDataUserByKey("id"),
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
        getPayById,
        createPayInvoice,
        getPayByAuthorId,
        setUserIdToPays,
      }}
    >
      {children}
    </PayContext.Provider>
  );
};
