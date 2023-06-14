import { useReducer } from "react";
import { reqAxios } from "../../helpers/helpers";
import { PaymentContext } from "./PaymentContext";
import PaymentReducer from "./PaymentReducer";
import { alertSuccess } from "../../helpers/alerts";

export const PaymentState = ({ children }) => {
  const initialState = {
    payment: {
      name: "",
    },
    payments: [],
    isFetching: true,
    totalPaymentsPages: 0,
    paymentsSelector: [],
  };
  const [state, dispatch] = useReducer(PaymentReducer, initialState);

  const createNewPayment = async (payment) => {
    try {
      const data = await reqAxios("POST", `/payment/create`, "", payment);
      alertSuccess(data.data.msg);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllPayments = async () => {
    try {
      const getAllPayments = await reqAxios("GET", "/payment/getall", "", "");

      const paymentToSelector = getAllPayments.data.response.map((item, i) => {
        return {
          label: item.name,
          value: item.id,
          target: { name: "areaId", value: item.id },
        };
      });

      dispatch({
        type: "GET_ALL_PAYMENTS",
        payload: {
          allPayments: getAllPayments.data.response,
          areaTotalPages: getAllPayments.data.pages,
          areasSelector: paymentToSelector,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PaymentContext.Provider
      value={{
        paymentState: state,
        createNewPayment,
        getAllPayments,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
