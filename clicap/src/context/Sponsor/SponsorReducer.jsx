import { GET_ALL, GET_ALL_SPONSORS, GET_ALL_INSTITUTIONAL } from "./types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_ALL:
      return {
        ...state,
        all: payload,
        isFetching: false,
      };
    case GET_ALL_SPONSORS:
      return {
        ...state,
        sponsors: payload,
        isFetching: false,
      };
    case GET_ALL_INSTITUTIONAL:
      return {
        ...state,
        institutional: payload,
        isFetching: false,
      };

    default:
      return state;
  }
};
