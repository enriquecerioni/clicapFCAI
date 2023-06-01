import { GET_ALL_EXPOSITIONS } from "./types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_ALL_EXPOSITIONS:
      return {
        ...state,
        isFetching: false,
        expositions: payload.expositions,
        expositionsSelector: payload.expositionsSelector,
      };

    default:
      return state;
  }
};
