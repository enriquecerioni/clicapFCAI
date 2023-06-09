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
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

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

  return (
    <AppContext.Provider
      value={{
        appState: state,
        setSearchPixels,
        setMenuPhone,
        setLoggout,
        setRefreshRoleIdAndUserId,
        getAppLogo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
