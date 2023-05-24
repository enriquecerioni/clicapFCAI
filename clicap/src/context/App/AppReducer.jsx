import { SET_SEARCH_PIXELS,SET_MENU_PHONE } from "./types";

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

    default:
      return state;
  }
};
