import {
  CLEAN_JOB_DATA,
  GET_ALL_JOB_VERSIONS,
  GET_ALL_JOBS,
  GET_IS_OWN_JOB,
  GET_JOB,
  SET_ASSIGNED_EVALUATOR,
  SET_JOB_LOADER,
  SET_JOBS_FILTERS,
  SET_USERID_TO_JOB,
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
    case SET_JOB_LOADER:
      return {
        ...state,
        jobLoader: payload,
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
    case GET_ALL_JOB_VERSIONS:
      return {
        ...state,
        isFetching: false,
        jobVersions: payload.jobVersions,
      };
    case GET_IS_OWN_JOB:
      return {
        ...state,
        isOwnJob: payload.isOwnJob,
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
