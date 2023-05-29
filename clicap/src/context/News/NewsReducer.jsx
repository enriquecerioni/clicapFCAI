import { GET_ALL_NEWS } from "./types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_ALL_NEWS:
      return {
        ...state,
        isFetching: false,
        news: payload,
      };

    default:
      return state;
  }
};
