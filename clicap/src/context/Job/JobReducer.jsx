import { GET_JOB } from "./types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_JOB:
      return {
        ...state,
        jobData: payload,
      };

    default:
      return state;
  }
};
