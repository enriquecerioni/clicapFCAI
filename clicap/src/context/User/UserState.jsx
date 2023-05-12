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
    usersFiltered: [],
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

  const getAllUsers = async () => {
    const getAllUser = await reqAxios("GET", "/user/getall", "", "");

    const userSelector = getAllUser.data.response.map((item, i) => {
      return {
        label: item.identifyNumber + " - " + item.name + " " + item.surname,
        value: item.identifyNumber,
        target: { name: "identifyNumber", value: item.identifyNumber },
      };
    });

    dispatch({
      type: "SET_USERS",
      payload: { users: getAllUser.data.response, userSelector: userSelector },
    });
  };

  const getUsersFiltered = async (page, params) => {
    const userFounded = state.usersFiltered.find(
      (user) =>
        user.identifyNumber === params.identifyNumber ||
        user.roleId === params.roleId
    );

    console.log(userFounded);
    if (userFounded) {
      return dispatch({
        type: "SET_USERS_FILTERED",
        payload: {
          usersFiltered: [userFounded],
          totalUsersPages: 1,
        },
      });
    }

    const getUsers = await reqAxios(
      "get",
      `/user/get/users/${page}`,
      params,
      ""
    );
    dispatch({
      type: "SET_USERS_FILTERED",
      payload: {
        usersFiltered: getUsers.data.response,
        totalUsersPages: getUsers.data.pages,
      },
    });
  };

  return (
    <UserContext.Provider
      value={{
        userState: state,
        getUserData,
        getAllUsers,
        getUsersFiltered,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
