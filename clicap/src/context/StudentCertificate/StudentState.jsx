import { useReducer } from "react";
import { formDataAxios, reqAxios } from "../../helpers/helpers";
import { alertSuccess } from "../../helpers/alerts";
import StudentReducer from "./StudentReducer";
import { StudentContext } from "./StudentContext";

export const StudentState = ({ children }) => {
  const initialState = {
    studentInitial: {
      name: "",
      type: "",
      link: "",
      urlFile: "",
      imgbase64: "",
      //only use in frontend
      isNew: true,
    },
    certificateFilters: {
      authorId: "",
    },
    studentCertificates: [],
    isFetching: true,
    totalStudentPages: 0,
    refreshCertificates: false
  };

  const [state, dispatch] = useReducer(StudentReducer, initialState);

  const getAllRegularCertificates = async (page, params) => {
    try {
      const allCertificates = await reqAxios(
        "GET",
        `/regular-certificates/get/certificate/${page}`,
        params,
        ""
      );
      console.log(
        "data",
        allCertificates.data.response,
        " ------",
        allCertificates.data.pages
      );
      dispatch({
        type: "GET_ALL_REGULAR_CERTIFICATES",
        payload: {
          studentCertificates: allCertificates.data.response,
          totalStudentPages: allCertificates.data.pages,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createNewCertificate = async (certificate) => {
    try {
      const bodyFormData = new FormData();
      for (const key in certificate) {
        bodyFormData.append(key, certificate[key]);
      }
      await formDataAxios(
        "POST",
        `/regular-certificates/create`,
        "",
        bodyFormData
      );

      dispatch({
        type: "SET_REFRESH_CERTIFICATES",
        payload: !state.refreshCertificates,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <StudentContext.Provider
      value={{
        studentState: state,
        createNewCertificate,
        getAllRegularCertificates,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
