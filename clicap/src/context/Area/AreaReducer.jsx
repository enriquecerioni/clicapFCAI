import { GET_ALL_AREAS } from "./types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_ALL_AREAS:
      return {
        ...state,
        isFetching: false,
        areas: payload.allAreas,
        totalAreasPages: payload.areaTotalPages,
        areasSelector: payload.areasSelector,
      };

    default:
      return state;
  }
};
