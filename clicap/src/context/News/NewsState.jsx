import { useReducer } from "react";
import { formDataAxios, reqAxios } from "../../helpers/helpers";
import NewsReducer from "./NewsReducer";
import { NewsContext } from "./NewsContext";

export const NewsState = ({ children }) => {
  const initialState = {
    newInitial: {
      title: "",
      content: "",
      urlFile: "",
    },
    news: [],
    isFetching: true,
  };

  const [state, dispatch] = useReducer(NewsReducer, initialState);

  const getAllNews = async () => {
    try {
      const getAllNew = await reqAxios("GET", "/new/getall", "", "");

      dispatch({
        type: "GET_ALL_NEWS",
        payload: getAllNew.data.response.reverse(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createNewNew = async (newToCreate) => {
    try {
      const bodyFormData = new FormData();
      for (const key in newToCreate) {
        bodyFormData.append(key, newToCreate[key]);
      }

      await formDataAxios("POST", `/new/create`, "", bodyFormData);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <NewsContext.Provider
      value={{
        newsState: state,
        getAllNews,
        createNewNew,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};
