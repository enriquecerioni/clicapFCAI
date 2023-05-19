import { GET_JOB,SET_JOBS_FILTERS, GET_ALL_JOBS } from "./types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_JOB:
      return {
        ...state,
        jobData: payload,
        isFetching: false,
      };
    case GET_ALL_JOBS:
      return {
        ...state,
        isFetching: false,
        jobs: payload.jobs,
        totalJobsPages: payload.totalJobsPages,
      };
    case SET_JOBS_FILTERS:
      return {
        ...state,
        jobsFilter: payload,
      };

    default:
      return state;
  }
};
