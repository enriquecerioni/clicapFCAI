import { useReducer } from "react";
import { getDataUserByKey, reqAxios } from "../../helpers/helpers";
import { CertificateContext } from "./CertificateContext";
import CertificateReducer from "./CertificateReducer";

export const CertificateState = ({ children }) => {
  const userId = getDataUserByKey("id");
  const initialState = {
    certificateData: {
      name: "",
      text: "",
    },
    certificates: [],
    certificateLogo: "",
    userCertificates: [],
    userIdToCertificate: "",
    nameToCertificate: "",
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
  const setUserIdToCertificate = async (id, name, surname) => {
    const fullName = `${name} ${surname}`;
    dispatch({
      type: "SET_USER_ID_TO_CERTIFICATE",
      payload: {
        id,
        fullName,
      },
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
        `/certificate/getcertificatelogo`,
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
        certificateData: state.certificateData,
        certificates: state.certificates,
        userCertificates: state.userCertificates,
        certificateLogo: state.certificateLogo,
        userIdToCertificate: state.userIdToCertificate,
        nameToCertificate: state.nameToCertificate,
        totalCertificatesPages: state.totalCertificatesPages,
        certificateSelector: state.certificateSelector,
        getAllCertificates,
        setUserIdToCertificate,
        getAllCertificatesByUser,
        getCertificatesLogo,
      }}
    >
      {children}
    </CertificateContext.Provider>
  );
};
