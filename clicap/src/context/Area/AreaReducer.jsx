import { GET_ALL_AREAS } from "./types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_ALL_AREAS:
      return {
        ...state,
        isFetching: false,
        jobs: payload.allJobs,
        totalJobsPages: payload.totalPages,
      };

    default:
      return state;
  }
};
