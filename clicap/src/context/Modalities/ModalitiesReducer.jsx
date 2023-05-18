import { GET_ALL_MODALITIES } from "./types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_ALL_MODALITIES:
      return {
        ...state,
        isFetching: false,
        modalities: payload.modalities,
        modalitiesSelector: payload.modalitiesSelector,
      };

    default:
      return state;
  }
};
