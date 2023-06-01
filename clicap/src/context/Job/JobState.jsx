import { useReducer } from "react";
import {
  formDataAxios,
  getDataUserByKey,
  reqAxios,
} from "../../helpers/helpers";
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
      authorId: "",
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
      evaluatorId: "",
    },
    correctionInitial: {
      jobId: "",
      correctionId: 0,
      evaluatorId: "",
      details: "",
      sendMail: 0,
    },
    prefiltered: false,
    isFetching: true,
    assignedEvaluator: false,
    totalJobsPages: 0,
    usersSelector: [],
  };
  const [state, dispatch] = useReducer(JobReducer, initialState);

  const createNewJob = async (job) => {
    try {
      const bodyFormData = new FormData();
      for (const key in job) {
        bodyFormData.append(key, job[key]);
      }
      console.log(bodyFormData);
      await formDataAxios("POST", `/job/create`, "", bodyFormData);
    } catch (e) {
      console.log(e);
    }
  };

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

  const cleanJobData = () => {
    try {
      dispatch({
        type: "CLEAN_JOB_DATA",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateJobById = async (job, jobId) => {
    try {
      await reqAxios("PUT", `/job/edit/${jobId}`, "", job);
      if (job.urlFile !== "") {
        const bodyFormData = new FormData();

        bodyFormData.append("id", jobId);
        bodyFormData.append("urlFile", job.urlFile);

        console.log(bodyFormData);
        await reqAxios("POST", `/job/upload`, "", bodyFormData);
      }
    } catch (e) {
      console.log(e);
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

  const addEvaluatorsToJob = async (jobId, jobEdited) => {
    try {
      await reqAxios("PUT", `/job/edit/${jobId}`, "", jobEdited);
      dispatch({
        type: "SET_ASSIGNED_EVALUATOR",
        payload: !state.assignedEvaluator,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const createEvaluationByEvaluatorOrAdmin = async (correction) => {
    try {
      await reqAxios("POST", "/jobdetails/create", "", correction);
      /* await reqAxios("PUT", `/job/setcorrection/${jobId}`, "", {
        status: correction.correctionId,
      }); */
    } catch (e) {
      console.log(e);
    }
  };

  const sendCorrectionApproved = async (correction) => {
    try {
      await reqAxios("POST", "/jobdetails/create", "", correction);
      /*  await reqAxios("PUT", `/job/setcorrection/${correction.jobId}`, "", {
        status: correction.correctionId,
      }); */
    } catch (e) {
      console.log(e);
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
  const checkCorrection = async (workId, userId, correctionNumber) => {
    const check = await reqAxios(
      "get",
      `/jobdetails/check/${workId}/${userId}/${correctionNumber}`,
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
  const setUserLogged = () => {
    dispatch({
      type: "SET_USER_LOGGED",
      payload: getDataUserByKey("id"),
    });
  };

  return (
    <JobContext.Provider
      value={{
        jobState: state,
        createNewJob,
        updateJobById,
        getJobId,
        getJobsFiltered,
        getCorrectionsByJob,
        checkCorrection,
        getCorrectionByJob,
        setJobFilters,
        getAllJobsByUser,
        addEvaluatorsToJob,
        createEvaluationByEvaluatorOrAdmin,
        sendCorrectionApproved,
        setUserLogged,
        cleanJobData,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
