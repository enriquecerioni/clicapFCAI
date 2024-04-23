import React, { useContext } from "react";
import { CertificateContext } from "../../context/Certificate/CertificateContext";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Page, Image, View, Document } from "@react-pdf/renderer";
import { PersonalCertificatePdf } from "../GenerateCertificate/CertificatePdfTypes/PersonalCertificatePdf";
import { JobCertificatePdf } from "../GenerateCertificate/CertificatePdfTypes/JobCertificatePdf";
import { Loader } from "../Loader/Loader";
import { styles } from "../GenerateCertificate/CertificateStyles";

export const CertificateUserList = ({ userCertificate }) => {
  const userLogged = JSON.parse(sessionStorage.getItem("user"));

  const { ceritificateState } = useContext(CertificateContext);
  const { certificateLogo } = ceritificateState;

  const { page, section, image, textContainer } = styles;

  const fullNameAndIdentityNumber = `${userLogged?.name} ${userLogged?.surname}, ${userLogged?.identifyType}: ${userLogged?.identifyNumber}`;

  return (
    <tr>
      <td>{userCertificate.certificate.name}</td>
      <td>{userCertificate.job ? userCertificate.job.name : "-"}</td>
      <td className="">
        <PDFDownloadLink
          document={
            <Document>
              <Page size="A4" orientation="landscape">
                <View style={page}>
                  <View style={section}>
                    <Image src={certificateLogo} style={image} />
                    <View style={textContainer}>
                      {userCertificate?.certificate?.type === 1 ? (
                        <PersonalCertificatePdf
                          user={fullNameAndIdentityNumber}
                          certificate={userCertificate?.certificate}
                        />
                      ) : (
                        <JobCertificatePdf
                          certificate={userCertificate?.certificate}
                          job={userCertificate?.job}
                        />
                      )}
                    </View>
                  </View>
                </View>
              </Page>
            </Document>
          }
          fileName="certificado.pdf"
        >
          {({ loading, url, error, blob }) =>
            loading ? (
              <Loader />
            ) : (
              <button className="btn btn-secondary">
                <i className="fa-solid fa-file-arrow-down icon-size-table"></i>
              </button>
            )
          }
        </PDFDownloadLink>
      </td>
    </tr>
  );
};
