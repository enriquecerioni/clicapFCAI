import {
  GET_JOB,
  SET_JOBS_FILTERS,
  GET_ALL_JOBS,
  SET_ASSIGNED_EVALUATOR,
  SET_USERID_TO_JOB,
  CLEAN_JOB_DATA,
} from "./types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_JOB:
      return {
        ...state,
        jobData: payload.jobData,
        correctionInitial: payload.correctionInitial,
        isFetching: false,
      };
    case CLEAN_JOB_DATA:
      return {
        ...state,
        jobData: {
          ...state.jobData,
          name: "",
          jobModalityId: "",
          areaId: "",
          status: 0,
          members: "",
          urlFile: "",
          evaluatorId1: "",
          evaluatorId2: "",
        },
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
    case SET_USERID_TO_JOB:
      return {
        ...state,
        jobData: {
          ...state.jobData,
          authorId: payload,
        },
        correctionInitial: {
          ...state.correctionInitial,
          evaluatorId: payload,
        },
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
