import {
  GET_CERTIFICATE,
  SET_CERTIFICATES_SELECTOR,
  SET_USER_ID_TO_CERTIFICATE,
} from "./types";

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
    case SET_USER_ID_TO_CERTIFICATE:
      return {
        ...state,
        userIdToCertificate: payload.id,
        nameToCertificate: payload.fullName,
      };

    default:
      return state;
  }
};
