import { GET_ALL_ROLES } from "./types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_ALL_ROLES:
      return {
        ...state,
        roles: payload.roles,
        rolesSelector: payload.rolesSelector,
      };

    default:
      return state;
  }
};
