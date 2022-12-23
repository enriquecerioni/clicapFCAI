import {
  GET_CERTIFICATE,
  SET_CERTIFICATES_SELECTOR,
  SET_USER_ID_TO_CERTIFICATE,
  GET_CERTIFICATES_BY_USER,
  GET_LOGO,
  GET_CERTIFICATE_BY_ID
} from "./types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_CERTIFICATE:
      return {
        ...state,
        certificates: payload,
      };
    case GET_CERTIFICATE_BY_ID:
      return {
        ...state,
        certificateData: payload,
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
    case GET_CERTIFICATES_BY_USER:
      return {
        ...state,
        userCertificates: payload,
      };
    case GET_LOGO:
      return {
        ...state,
        certificateLogo: payload,
      };

    default:
      return state;
  }
};
