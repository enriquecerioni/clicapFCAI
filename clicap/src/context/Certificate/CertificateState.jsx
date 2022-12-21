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

  return (
    <CertificateContext.Provider
      value={{
        certificateData: state.certificateData,
        certificates: state.certificates,
        totalCertificatesPages: state.totalCertificatesPages,
        certificateSelector: state.certificateSelector,
        getAllCertificates,
      }}
    >
      {children}
    </CertificateContext.Provider>
  );
};
