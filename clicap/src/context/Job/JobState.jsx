import { useReducer } from "react";
import { getDataUserByKey, reqAxios } from "../../helpers/helpers";
import { JobContext } from "./JobContext";
import JobReducer from "./JobReducer";

export const JobState = ({ children }) => {
  const userId = getDataUserByKey("id");
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
    totalJobsPages: 0,
    usersSelector: [],
  };
  const [state, dispatch] = useReducer(JobReducer, initialState);

  const getJobId = async (id) => {
    try {
      const dataJobId = await reqAxios("GET", `/job/get/${id}`, "", "");
      if (dataJobId.data.response[0].members !== '') {
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

  return (
    <JobContext.Provider
      value={{
        jobData: state.jobData,
        jobs: state.jobs,
        totalJobsPages: state.totalJobsPages,
        usersSelector: state.usersSelector,
        getJobId,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
