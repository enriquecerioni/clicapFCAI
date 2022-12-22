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

  return (
    <CertificateContext.Provider
      value={{
        certificateData: state.certificateData,
        certificates: state.certificates,
        userIdToCertificate: state.userIdToCertificate,
        nameToCertificate: state.nameToCertificate,
        totalCertificatesPages: state.totalCertificatesPages,
        certificateSelector: state.certificateSelector,
        getAllCertificates,
        setUserIdToCertificate,
      }}
    >
      {children}
    </CertificateContext.Provider>
  );
};
