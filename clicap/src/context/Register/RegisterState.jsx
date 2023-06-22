import { useReducer } from "react";
import { reqAxios } from "../../helpers/helpers";
import { RegisterContext } from "./RegisterContext";
import RegisterReducer from "./RegisterReducer";
import { alertError, alertSuccess } from "../../helpers/alerts";

export const RegisterState = ({ children }) => {
  const initialState = {
    roles: [],
    rolesSelector: [],
  };

  const [state, dispatch] = useReducer(RegisterReducer, initialState);

  const getAllRoles = async () => {
    try {
      const getRole = await reqAxios("GET", "/role/getall", "", "");

      const rolesToSelector = getRole.data.response.map((item, i) => {
        return {
          label: item.name,
          value: item.id,
          target: { name: "roleId", value: item.id },
        };
      });

      dispatch({
        type: "GET_ALL_ROLES",
        payload: {
          roles: getRole.data.response,
          rolesSelector: rolesToSelector,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async (userRegister) => {
    try {
      const data = await reqAxios("POST", "/user/register", "", userRegister);
      alertSuccess(data.data.response);
    } catch (error) {
      console.log(error);
    }
  };

  const editUser = async (userRegister) => {
    const data = await reqAxios(
      "PUT",
      `/user/edit/${userRegister.id}`,
      "",
      userRegister
    );

    if (data.status && data.status === 200) {
      alertSuccess(data.data.response);
    } else {
      return alertError(data.response.data.msg);
    }
  };

  return (
    <RegisterContext.Provider
      value={{
        registerState: state,
        getAllRoles,
        createUser,
        editUser,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};
