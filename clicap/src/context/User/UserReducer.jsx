import { GET_USER_DATA } from "./types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_USER_DATA:
      return {
        ...state,
        userData: payload,
      };

    default:
      return state;
  }
};
