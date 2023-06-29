import { useReducer } from "react";
import { reqAxios } from "../../helpers/helpers";
import { AreaContext } from "./AreaContext";
import AreaReducer from "./AreaReducer";
import { alertSuccess } from "../../helpers/alerts";

export const AreaState = ({ children }) => {
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

  const createNewArea = async (area) => {
    try {
      const data = await reqAxios("POST", `/area/create`, "", area);
      alertSuccess(data.data.msg);
    } catch (e) {
      console.log(e);
    }
  };

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
        createNewArea,
        getNumberOfJobs,
        getAllAreas,
      }}
    >
      {children}
    </AreaContext.Provider>
  );
};
