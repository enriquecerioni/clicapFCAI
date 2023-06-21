import { useReducer } from "react";
import { reqAxios } from "../../helpers/helpers";
import { ModalitiesContext } from "./ModalitiesContext";
import ModalitiesReducer from "./ModalitiesReducer";

export const ModalitiesState = ({ children }) => {

  const initialState = {
    modalities: [],
    isFetching: true,
    modalitiesSelector: [],
  };

  const [state, dispatch] = useReducer(ModalitiesReducer, initialState);

  const getAllModalities = async () => {
    try {

      const getAllModalities = await reqAxios(
        "GET",
        "/jobmodality/getall",
        "",
        ""
      );

      const modalitiesToSelector = getAllModalities.data.response.map(
        (item, i) => {
          return {
            label: item.title,
            value: item.id,
            target: { name: "jobModalityId", value: item.id },
          };
        }
      );

      dispatch({
        type: "GET_ALL_MODALITIES",
        payload: {
          modalities: getAllModalities.data.response,
          modalitiesSelector: modalitiesToSelector,
        },
      });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ModalitiesContext.Provider
      value={{
        modalitiesState: state,
        getAllModalities,
      }}
    >
      {children}
    </ModalitiesContext.Provider>
  );
};
