import { useReducer } from "react";
import {
  formDataAxios,
  getDataUserByKey,
  reqAxios,
} from "../../helpers/helpers";
import { JobContext } from "./JobContext";
import JobReducer from "./JobReducer";

export const JobState = ({ children }) => {
  const initialState = {
    jobData: {
      name: "",
      jobModalityId: "",
      areaId: "",
      userId: "",
      author: "",
      status: 0,
      members: "",
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
      correctionNumber: "",
      correctionId: 0,
      evaluatorId: "",
      details: "",
      sendMail: 0,
    },
    isOwnJob: false,
    jobVersions: [],
    prefiltered: false,
    isFetching: true,
    jobLoader: false,
    assignedEvaluator: false,
    totalJobsPages: 0,
    usersSelector: [],
  };
  const [state, dispatch] = useReducer(JobReducer, initialState);

  const createNewJob = async (job) => {
    try {
      setJobLoader(true);
      const bodyFormData = new FormData();
      for (const key in job) {
        bodyFormData.append(key, job[key]);
      }
      await formDataAxios("POST", `/job/create`, "", bodyFormData);
      setJobLoader(false);
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
        payload: {
          jobData: dataJobId.data.response[0],
          correctionInitial: {
            ...state.correctionInitial,
            jobId: Number(dataJobId.data.response[0].id),
            correctionNumber: dataJobId.data.response[0].correctionNumber,
          },
        },
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
      setJobLoader(true);
      job.newVersion = true;
      await reqAxios("PUT", `/job/edit/${jobId}`, "", job);
      if (job.urlFile !== "") {
        const bodyFormData = new FormData();

        bodyFormData.append("id", jobId);
        bodyFormData.append("urlFile", job.urlFile);

        console.log(bodyFormData);
        await reqAxios("POST", `/job/upload`, "", bodyFormData);
        setJobLoader(false);
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
      setJobLoader(true);
      await reqAxios("POST", "/jobdetails/create", "", correction);
      setJobLoader(false);
    } catch (e) {
      console.log(e);
    }
  };

  const sendCorrectionApproved = async (correction) => {
    try {
      setJobLoader(true);
      await reqAxios("POST", "/jobdetails/create", "", correction);
      setJobLoader(false);
    } catch (e) {
      console.log(e);
    }
  };

  //Buscar las correciones de un trabajo
  const getCorrectionsByJob = async (id, correctionNumber) => {
    const roleId = getDataUserByKey("roleId");
    try {
      const corrections = await reqAxios(
        "GET",
        `/jobdetails/get/${roleId}/${id}/${correctionNumber}`,
        {},
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

  //Obtener la correción para el trabajo como usuario
  const getCorrectionByJob = async (jobId, correctionNumber) => {
    const roleId = getDataUserByKey("roleId");

    try {
      const corrections = await reqAxios(
        "GET",
        `/jobdetails/get/${roleId}/${jobId}/${correctionNumber}`,
        "",
        ""
      );
      return corrections.data.response[0];
    } catch (error) {
      console.log(error);
    }
  };

   //Obtener las versiones de un trabajo por id
   const getJobVersionsById = async (jobId) => {

    try {
      const jobVersions = await reqAxios(
        "GET",
        `/jobversions/get/${jobId}`,
        "",
        ""
      );
      
      dispatch({
        type: "GET_ALL_JOB_VERSIONS",
        payload: {
          jobVersions: jobVersions.data.response,
        },
      })
      
    } catch (error) {
      console.log(error);
    }
  };

   //Verificar si el trabajo es del usuario actual
   const validateIsOwnJob = async (jobId, userId) => {

    try {
      const isOwnJob = await reqAxios(
        "GET",
        `/job/get/is-own-job/${jobId}/${userId}`,
        "",
        ""
      );
      
      dispatch({
        type: "GET_IS_OWN_JOB",
        payload: {
          isOwnJob: isOwnJob.data.response,
        },
      })
      
    } catch (error) {
      console.log(error);
    }
  };

  const getJobByAuthorId = async (userId) => {
    const getAuthorJob = await reqAxios(
      "GET",
      `/job/get/author/${userId}`,
      "",
      ""
    );
    return getAuthorJob.data.response;
  };

  const setJobFilters = (filters) => {
    dispatch({
      type: "SET_JOBS_FILTERS",
      payload: filters,
    });
  };

  const setRefreshUserIdToJob = async () => {
    dispatch({
      type: "SET_USERID_TO_JOB",
      payload: getDataUserByKey("id"),
    });
  };

  const setJobLoader = (value) => {
    dispatch({
      type: "SET_JOB_LOADER",
      payload: value,
    });
  };

  return (
    <JobContext.Provider
      value={{
        jobState: state,
        addEvaluatorsToJob,
        checkCorrection,
        cleanJobData,
        createEvaluationByEvaluatorOrAdmin,
        createNewJob,
        getAllJobsByUser,
        getCorrectionByJob,
        getCorrectionsByJob,
        getJobByAuthorId,
        getJobId,
        getJobsFiltered,
        getJobVersionsById,
        sendCorrectionApproved,
        setJobFilters,
        setRefreshUserIdToJob,
        updateJobById,
        validateIsOwnJob,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
