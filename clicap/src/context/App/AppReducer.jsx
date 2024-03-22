import {
  GET_EVENT_DATE,
  SET_LOGGOUT,
  SET_MENU_PHONE,
  SET_REFRESH_ROLEID_USERID,
  SET_SEARCH_PIXELS,
} from "./types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_EVENT_DATE:
      return {
        ...state,
        eventDate: payload,
      }
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
