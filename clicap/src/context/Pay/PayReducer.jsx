import { SET_PAYS, SET_PAY, SET_REFRESH_PAYS, SET_USERID } from "./types";
export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_PAYS:
      return {
        ...state,
        pays: payload.pays,
        totalPaysPages: payload.totalPages,
        isFetching: false,
      };
    case SET_PAY:
      return {
        ...state,
        payData: payload,
        isFetching: false,
      };
    case SET_REFRESH_PAYS:
      return {
        ...state,
        refreshPays: payload,
      };
    case SET_USERID:
      return {
        ...state,
        payData: {
          ...state.payData,
          authorId: payload,
        },
      };

    default:
      return state;
  }
};
