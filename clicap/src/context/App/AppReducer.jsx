import {
  SET_SEARCH_PIXELS,
  SET_MENU_PHONE,
  SET_LOGGOUT,
  SET_REFRESH_ROLEID_USERID,
} from "./types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_SEARCH_PIXELS:
      return {
        ...state,
        searchPixels: payload,
      };
    case SET_MENU_PHONE:
      return {
        ...state,
        menuPhone: payload,
      };
    case SET_LOGGOUT:
      return {
        ...state,
        loggout: payload,
      };
    case SET_REFRESH_ROLEID_USERID:
      return {
        ...state,
        refreshRoleIdAndUserId: payload,
      };

    default:
      return state;
  }
};
