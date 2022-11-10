import { useReducer } from "react";
import { reqAxios } from "../../helpers/helpers";
import { UserContext } from "./UserContext";
import UserReducer from "./UserReducer";

export const UserState = ({ children }) => {
  const initialState = {
    userData: {
      roleId: "",
      identifyType: "",
      name: "",
      surname: "",
      email: "",
      identifyNumber: "",
      address: "",
      institution: "",
      phone: "",
      password: "",
      passwordConfirm: "",
    },
    users: [],
    totalUsersPages: 0,
    usersSelector: [],
  };
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const getUserData = async (id) => {
    const dataUser = await reqAxios("GET", `/user/get/${id}`, "", "");
    //agrego passwordConfirm al objeto porque sino despues al no existir no puede hacer la validacion en el .strim()
    dataUser.data.response.passwordConfirm = dataUser.data.response.password;
    dispatch({
      type: "GET_USER_DATA",
      payload: dataUser.data.response,
    });
  };

  return (
    <UserContext.Provider
      value={{
        userData: state.userData,
        users: state.users,
        totalUsersPages: state.totalUsersPages,
        usersSelector: state.usersSelector,
        getUserData
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
