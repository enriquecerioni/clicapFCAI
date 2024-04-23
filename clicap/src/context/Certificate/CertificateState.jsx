import { useReducer } from "react";
import { reqAxios } from "../../helpers/helpers";
import { CertificateContext } from "./CertificateContext";
import CertificateReducer from "./CertificateReducer";

export const CertificateState = ({ children }) => {
  const initialState = {
    certificateData: {
      type: 1,
      name: "",
      introtext: "",
      jobtext: "",
      text: "",
    },
    certificateTypesOpt: [
      { value: 1, label: "Personal", target: { value: 1, name: "type" } },
      { value: 2, label: "Por trabajo", target: { value: 2, name: "type" } },
    ],
    certificates: [],
    isFetching: true,
    certificateLogo: "",
    userCertificates: [],
    userToCertificate: "",
    totalCertificatesPages: 0,
    certificateSelector: [],
  };
  const [state, dispatch] = useReducer(CertificateReducer, initialState);

  const getAllCertificates = async () => {
    try {
      const certificates = await reqAxios("GET", `/certificate/getall`, "", "");

      dispatch({
        type: "GET_CERTIFICATE",
        payload: certificates.data.response,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCertificatesPaginated = async (page, params) => {
    try {
      const certificates = await reqAxios("GET", `/student/get/paginated/${page}`, params, "");

      dispatch({
        type: "GET_ALL_CERTIFICATES_AWARDED",
        payload: {
          userCertificates: certificates.data.response,
          totalCertificatesPages: certificates.data.pages,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const resetCertificateData = async () => {
    try {
      dispatch({
        type: "RESET_CERTIFICATE_DATA",
        payload: {
          type: 1,
          name: "",
          introtext: "",
          jobtext: "",
          text: "",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getCertificateById = async (id) => {
    try {
      const certificates = await reqAxios(
        "GET",
        `/certificate/get/${id}`,
        "",
        ""
      );

      dispatch({
        type: "GET_CERTIFICATE_BY_ID",
        payload: certificates.data.response,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const setUserIdToCertificate = async (user) => {
    dispatch({
      type: "SET_USER_TO_CERTIFICATE",
      payload: user,
    });
  };
  const getAllCertificatesByUser = async (id) => {
    try {
      const certificates = await reqAxios(
        "GET",
        `/student/getall/${id}`,
        "",
        ""
      );

      dispatch({
        type: "GET_CERTIFICATES_BY_USER",
        payload: certificates.data.response,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getCertificatesLogo = async () => {
    try {
      const certificatesLogo = await reqAxios(
        "GET",
        `/certificate/getcertificatelogo/certificateLogo`,
        "",
        ""
      );

      dispatch({
        type: "GET_LOGO",
        payload: `data:image/jpeg;base64,${certificatesLogo.data.response}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CertificateContext.Provider
      value={{
        ceritificateState: state,
        getAllCertificates,
        getAllCertificatesPaginated,
        setUserIdToCertificate,
        getAllCertificatesByUser,
        getCertificatesLogo,
        getCertificateById,
        resetCertificateData,
      }}
    >
      {children}
    </CertificateContext.Provider>
  );
};
