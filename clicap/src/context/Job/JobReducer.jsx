import { GET_JOB, GET_ALL_JOBS } from "./types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_JOB:
      return {
        ...state,
        jobData: payload,
      };
    case GET_ALL_JOBS:
      return {
        ...state,
        jobs: payload.allJobs,
        totalJobsPages: payload.totalPages,
      };

    default:
      return state;
  }
};
