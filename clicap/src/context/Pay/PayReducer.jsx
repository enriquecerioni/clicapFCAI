import { SET_PAYS, SET_REFRESH_PAYS } from "./types";
export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_PAYS:
      return {
        ...state,
        pays: payload,
        isFetching: false,
      };
    case SET_REFRESH_PAYS:
      return {
        ...state,
        refreshPays: payload,
      };

    default:
      return state;
  }
};
