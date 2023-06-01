import { useReducer } from "react";
import { reqAxios } from "../../helpers/helpers";
import { ExpositionContext } from "./ExpositionContext";
import ExpositionReducer from "./ExpositionReducer";

export const ExpositionState = ({ children }) => {
  const initialState = {
    expositions: [],
    isFetching: true,
    expositionsSelector: [],
  };

  const [state, dispatch] = useReducer(ExpositionReducer, initialState);

  const getAllExpositions = async () => {
    try {
      const getAllExpositions = await reqAxios(
        "GET",
        "/jobexposition/getall",
        "",
        ""
      );

      const expositionsToSelector = getAllExpositions.data.response.map(
        (item, i) => {
          return {
            label: item.name,
            value: item.id,
            target: { name: "jobExpositionId", value: item.id },
          };
        }
      );

      dispatch({
        type: "GET_ALL_EXPOSITIONS",
        payload: {
          expositions: getAllExpositions.data.response,
          expositionsSelector: expositionsToSelector,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ExpositionContext.Provider
      value={{
        expositionState: state,
        getAllExpositions,
      }}
    >
      {children}
    </ExpositionContext.Provider>
  );
};
