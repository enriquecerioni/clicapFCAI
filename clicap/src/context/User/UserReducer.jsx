import { GET_USER_DATA, SET_USERS, SET_USERS_FILTERED } from "./types";

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
    case SET_USERS_FILTERED:
      return {
        ...state,
        usersFiltered: payload.usersFiltered,
        totalUsersPages: payload.totalUsersPages,
      };

    default:
      return state;
  }
};
