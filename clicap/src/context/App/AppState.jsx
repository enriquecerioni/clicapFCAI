import { useReducer } from "react";
import AppReducer from "./AppReducer";
import { AppContext } from "./AppContext";

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

  return (
    <AppContext.Provider
      value={{
        appState: state,
        setSearchPixels,
        setMenuPhone,
        setLoggout,
        setRefreshRoleIdAndUserId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
