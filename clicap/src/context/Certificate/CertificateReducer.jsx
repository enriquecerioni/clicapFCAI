import {
  GET_CERTIFICATE,
  SET_CERTIFICATES_SELECTOR,
  SET_USER_TO_CERTIFICATE,
  GET_CERTIFICATES_BY_USER,
  GET_LOGO,
  GET_CERTIFICATE_BY_ID,
} from "./types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_CERTIFICATE:
      return {
        ...state,
        certificates: payload,
        isFetching: false,
      };
    case GET_CERTIFICATE_BY_ID:
      return {
        ...state,
        certificateData: payload,
        isFetching: false,
      };
    case SET_CERTIFICATES_SELECTOR:
      return {
        ...state,
        certificateSelector: payload,
      };
    case SET_USER_TO_CERTIFICATE:
      return {
        ...state,
        userToCertificate: payload,
      };
    case GET_CERTIFICATES_BY_USER:
      return {
        ...state,
        userCertificates: payload,
        isFetching: false,
      };
    case GET_LOGO:
      return {
        ...state,
        certificateLogo: payload,
        isFetching: false,
      };

    default:
      return state;
  }
};
