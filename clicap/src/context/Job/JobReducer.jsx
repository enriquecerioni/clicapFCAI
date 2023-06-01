import {
  GET_JOB,
  SET_JOBS_FILTERS,
  GET_ALL_JOBS,
  SET_ASSIGNED_EVALUATOR,
  SET_USER_LOGGED,
  CLEAN_JOB_DATA,
} from "./types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_JOB:
      return {
        ...state,
        jobData: payload,
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
    case SET_ASSIGNED_EVALUATOR:
      return {
        ...state,
        assignedEvaluator: payload,
      };
    case SET_USER_LOGGED:
      return {
        ...state,
        jobData: { ...state.jobData, authorId: payload },
        correctionInitial: { ...state.correctionInitial, evaluatorId: payload },
      };

    default:
      return state;
  }
};
