import { GET_ALL_IMPORTANT_DATES } from "./types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_ALL_IMPORTANT_DATES:
      return {
        ...state,
        importantDates: payload,
        isFetching: false,
      };

    default:
      return state;
  }
};
