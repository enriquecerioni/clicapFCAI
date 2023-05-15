import { SET_PAYS } from "./types";
export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_PAYS:
      return {
        ...state,
        pays: payload,
        isFetching: false,
      };

    default:
      return state;
  }
};
