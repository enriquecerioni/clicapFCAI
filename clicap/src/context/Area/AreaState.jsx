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
    areasSelector: [],
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

  const getAllAreas = async () => {
    try {
      const getAllArea = await reqAxios("GET", "/area/getall", "", "");

      const areasToSelector = getAllArea.data.response.map((item, i) => {
        return {
          label: item.name,
          value: item.id,
          target: { name: "areaId", value: item.id },
        };
      });

      dispatch({
        type: "GET_ALL_AREAS",
        payload: {
          allAreas: getAllArea.data.response,
          areaTotalPages: getAllArea.data.pages,
          areasSelector: areasToSelector,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AreaContext.Provider
      value={{
        areaState: state,
        getNumberOfJobs,
        getAllAreas,
      }}
    >
      {children}
    </AreaContext.Provider>
  );
};
