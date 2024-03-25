import { useReducer } from "react";
import AppReducer from "./AppReducer";
import { AppContext } from "./AppContext";
import { reqAxios } from "../../helpers/helpers";

export const AppState = ({ children }) => {
  const initialState = {
    searchPixels: false,
    menuPhone: false,
    refreshRoleIdAndUserId: true,
    loggout: false,
    eventDate: null,
    deadlineDays: null,
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  const setDeadlineDays = async (days) => {
    await reqAxios("PUT", `/date/edit/deadline/${days}`, "", "");
    dispatch({
      type: "SET_DEADLINE_DAY",
      payload: days,
    });
  };

  const handleTime = async (date) => {
    await reqAxios("PUT", `/date/edit/${date}`, "", "");
    window.location.reload();
  };

  const setSearchPixels = async (value) => {
    dispatch({
      type: "SET_SEARCH_PIXELS",
      payload: value,
    });
  };

  const setMenuPhone = async (value) => {
    dispatch({
      type: "SET_MENU_PHONE",
      payload: value,
    });
  };
  const setLoggout = async () => {
    dispatch({
      type: "SET_LOGGOUT",
      payload: !state.loggout,
    });
  };
  const setRefreshRoleIdAndUserId = (value) => {
    dispatch({
      type: "SET_REFRESH_ROLEID_USERID",
      payload: value,
    });
  };
  const getAppLogo = async () => {
    const AppLogo = await reqAxios(
      "GET",
      `/certificate/getcertificatelogo/appLogo`,
      "",
      ""
    );

    return AppLogo.data.response;
  };

  const getEventDate = async () => {

    const eventDate = await reqAxios(
      "GET",
      `/date/get`,
      "",
      ""
    );
    dispatch({
      type: "GET_EVENT_DATE",
      payload: eventDate.data.response,
    });
  }

  return (
    <AppContext.Provider
      value={{
        appState: state,
        getAppLogo,
        getEventDate,
        handleTime,
        setDeadlineDays,
        setLoggout,
        setMenuPhone,
        setRefreshRoleIdAndUserId,
        setSearchPixels,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

