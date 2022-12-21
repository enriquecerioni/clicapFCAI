import { GET_CERTIFICATE,SET_CERTIFICATES_SELECTOR } from "./types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_CERTIFICATE:
      return {
        ...state,
        certificates: payload,
      };
    case SET_CERTIFICATES_SELECTOR:
      return {
        ...state,
        certificateSelector: payload,
      };

    default:
      return state;
  }
};
