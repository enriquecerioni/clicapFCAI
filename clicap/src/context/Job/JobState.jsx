import { useReducer } from "react";
import { getDataUserByKey, reqAxios } from "../../helpers/helpers";
import { JobContext } from "./JobContext";
import JobReducer from "./JobReducer";

export const JobState = ({ children }) => {
  const userId = getDataUserByKey("id");
  const roleId = getDataUserByKey("roleId");

  const initialState = {
    jobData: {
      name: "",
      jobModalityId: "",
      areaId: "",
      authorId: getDataUserByKey("id"),
      status: 0,
      members: "",
      urlFile: "",
      evaluatorId1: "",
      evaluatorId2: "",
    },
    jobs: [],
    jobsFilter: {
      authorId: "",
      name: "",
      areaId: "",
      jobModalityId: "",
      status: "",
      evaluatorId: roleId === 2 ? userId : "",
    },
    prefiltered: false,
    isFetching: true,
    totalJobsPages: 0,
    usersSelector: [],
  };
  const [state, dispatch] = useReducer(JobReducer, initialState);

  const getJobId = async (id) => {
    try {
      const dataJobId = await reqAxios("GET", `/job/get/${id}`, "", "");
      if (dataJobId.data.response[0].members !== "") {
        const partners = dataJobId.data.response[0].members.split(",");
        dataJobId.data.response[0].members = partners;
      }

      dispatch({
        type: "GET_JOB",
        payload: dataJobId.data.response[0],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getJobsFiltered = async (page, params) => {
    try {
      const getAllJob = await reqAxios(
        "GET",
        `/job/get/jobs/${page}`,
        params,
        ""
      );

      dispatch({
        type: "GET_ALL_JOBS",
        payload: {
          jobs: getAllJob.data.response,
          totalJobsPages: getAllJob.data.pages,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllJobsByUser = async (authorId) => {
    try {
      const getAllJobsByUser = await reqAxios(
        "GET",
        `/job/getjobs/byuser?authorId=${authorId}`,
        "",
        ""
      );
      return getAllJobsByUser.data.response;
    } catch (error) {
      console.log(error);
    }
  };

  //Buscar las correciones de un trabajo
  const getCorrectionsByJob = async (id) => {
    const params = { roleId, evaluatorId: userId };
    try {
      const corrections = await reqAxios(
        "GET",
        `/jobdetails/get/${id}`,
        params,
        ""
      );
      return corrections.data.response;
    } catch (error) {
      console.log(error);
    }
  };

  //Chequea si ya tiene una correccion
  const checkCorrection = async (workId, userId) => {
    const check = await reqAxios(
      "get",
      `/jobdetails/check/${workId}/${userId}`,
      "",
      ""
    );
    return check.data.value;
  };

  //Buscar la correcion para el trabajo como usuario
  const getCorrectionByJob = async (id) => {
    const params = { roleId, evaluatorId: null };
    try {
      const corrections = await reqAxios(
        "GET",
        `/jobdetails/get/${id}`,
        params,
        ""
      );
      return corrections.data.response[0];
    } catch (error) {
      console.log(error);
    }
  };

  const setJobFilters = (filters) => {
    dispatch({
      type: "SET_JOBS_FILTERS",
      payload: filters,
    });
  };

  return (
    <JobContext.Provider
      value={{
        jobState: state,
        getJobId,
        getJobsFiltered,
        getCorrectionsByJob,
        checkCorrection,
        getCorrectionByJob,
        setJobFilters,
        getAllJobsByUser,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
