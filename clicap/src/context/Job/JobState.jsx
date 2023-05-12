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
      authorId: userId,
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
          allJobs: getAllJob.data.response,
          totalPages: getAllJob.data.pages,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <JobContext.Provider
      value={{
        jobState: state,
        getJobId,
        getJobsFiltered,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
