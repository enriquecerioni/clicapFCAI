import { useReducer } from "react";
import { reqAxios } from "../../helpers/helpers";
import { alertSuccess } from "../../helpers/alerts";
import ImportantDateReducer from "./ImportantDateReducer";
import { ImportantDateContext } from "./ImportantDateContext";

export const ImportantDateState = ({ children }) => {
  const initialState = {
    importantDateInitial: {
      title: "",
      description: "",
      //only use in frontend
      isNew: true,
    },
    importantDates: [],
    isFetching: true,
    totalImportantDatesPages: 0,
  };

  const [state, dispatch] = useReducer(ImportantDateReducer, initialState);

  const createNewImportantDate = async (importantDate) => {
    try {
      const data = await reqAxios(
        "POST",
        `/importantdate/create`,
        "",
        importantDate
      );
    } catch (e) {
      console.log(e);
    }
  };

  const editImportantDate = async (id, importantDate) => {
    try {
      await reqAxios("POST", `/importantdate/edit/${id}`, "", importantDate);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllImportantDates = async () => {
    try {
      const getAllData = await reqAxios("GET", "/importantdate/getall", "", "");

      dispatch({
        type: "GET_ALL_IMPORTANT_DATES",
        payload: getAllData.data.response,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ImportantDateContext.Provider
      value={{
        importantDateState: state,
        createNewImportantDate,
        getAllImportantDates,
        editImportantDate,
      }}
    >
      {children}
    </ImportantDateContext.Provider>
  );
};
