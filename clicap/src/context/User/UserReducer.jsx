import { GET_USER_DATA, SET_USERS } from "./types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_USER_DATA:
      return {
        ...state,
        userData: payload,
      };
    case SET_USERS:
      return {
        ...state,
        users: payload.users,
        usersSelector: payload.userSelector,
      };

    default:
      return state;
  }
};
