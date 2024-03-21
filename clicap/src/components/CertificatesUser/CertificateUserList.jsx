import React, { useContext } from "react";
import { getDataUserByKey } from "../../helpers/helpers";
import { ClicapTooltip } from "../ClicapTooltip/ClicapTooltip";
import { CertificateContext } from "../../context/Certificate/CertificateContext";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Pdf } from "../GenerateCertificate/Pdf";

export const CertificateUserList = ({ userCertificate }) => {
  const userLogged = JSON.parse(sessionStorage.getItem("user"));

  const { ceritificateState } = useContext(CertificateContext);
  const { certificateLogo } = ceritificateState;

  return (
    <tr>
      <td>{userCertificate.certificate.name}</td>
      <td>{userCertificate.job ? userCertificate.job.name : "-"}</td>
      <td className="">
        <ClicapTooltip tooltip={true} text={"Descargar certificado"}>
          <PDFDownloadLink
            document={
              <Pdf
                logo={certificateLogo}
                user={userLogged}
                certificate={userCertificate?.certificate}
                job={userCertificate?.job}
              />
            }
            fileName="certificado.pdf"
          >
            {({ loading, url, error, blob }) =>
              loading ? (
                <button>Descargando...</button>
              ) : (
                <button className="btn btn-secondary">
                  <i className="fa-solid fa-file-arrow-down icon-size-table"></i>
                </button>
              )
            }
          </PDFDownloadLink>
        </ClicapTooltip>
      </td>
    </tr>
  );
};
