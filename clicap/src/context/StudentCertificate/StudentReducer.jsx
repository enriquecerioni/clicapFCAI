import { GET_ALL_REGULAR_CERTIFICATES } from "./types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_ALL_REGULAR_CERTIFICATES:
      return {
        ...state,
        studentCertificates: payload.studentCertificates,
        totalStudentPages: payload.totalStudentPages,
        isFetching: false,
      };

    default:
      return state;
  }
};
