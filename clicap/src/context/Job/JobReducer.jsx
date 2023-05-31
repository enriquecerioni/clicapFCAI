import { GET_JOB,SET_JOBS_FILTERS, GET_ALL_JOBS, SET_ASSIGNED_EVALUATOR } from "./types";

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
    case SET_ASSIGNED_EVALUATOR:
      return {
        ...state,
        assignedEvaluator: payload,
      };

    default:
      return state;
  }
};
