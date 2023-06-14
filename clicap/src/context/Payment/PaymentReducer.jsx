import { GET_ALL_PAYMENTS } from "./types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_ALL_PAYMENTS:
      return {
        ...state,
        isFetching: false,
        payments: payload.allPayments,
        totalPaymentsPages: payload.paymentTotalPages,
        paymentsSelector: payload.paymentsSelector,
      };

    default:
      return state;
  }
};
