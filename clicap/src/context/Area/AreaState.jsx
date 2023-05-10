import { useReducer } from "react";
import { getDataUserByKey, reqAxios } from "../../helpers/helpers";
import { AreaContext } from "./AreaContext";
import AreaReducer from "./AreaReducer";

export const AreaState = ({ children }) => {
  const userId = getDataUserByKey("id");
  const initialState = {
    area: {
      name: "",
    },
    areas: [],
    isFetching: true,
    totalAreasPages: 0,
  };
  const [state, dispatch] = useReducer(AreaReducer, initialState);

  const getNumberOfJobs = async () => {
    const jobsAndSummaries = await reqAxios(
      "GET",
      `/job/getamountjobs`,
      "",
      ""
    );
    return jobsAndSummaries.data.response;
  };

  return (
    <AreaContext.Provider
      value={{
        areaState: state,
        getNumberOfJobs,
      }}
    >
      {children}
    </AreaContext.Provider>
  );
};
