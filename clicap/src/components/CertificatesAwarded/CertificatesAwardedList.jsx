import React, { useContext } from "react";
import { useLocation } from "react-router";
import { CertificateContext } from "../../context/Certificate/CertificateContext";
import { ClicapTooltip } from "../ClicapTooltip/ClicapTooltip";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Page, Image, View, Document } from "@react-pdf/renderer";
import { PersonalCertificatePdf } from "../GenerateCertificate/CertificatePdfTypes/PersonalCertificatePdf";
import { JobCertificatePdf } from "../GenerateCertificate/CertificatePdfTypes/JobCertificatePdf";
import { styles } from "../GenerateCertificate/CertificateStyles";
import { Loader } from "../Loader/Loader";

export const CertificatesAwardedList = ({
  certificate,
  setCertificatesAwardedToDelete,
  showAlert,
}) => {

  const location = useLocation();
  const { pathname } = location;

  const { ceritificateState } = useContext(CertificateContext);
  const { certificateLogo } = ceritificateState;

  const certificateType = (typeId) => typeId === 1 ? "Personal" : "Por Trabajo";

  const deleteCertificate = () => {
    showAlert(true);
    setCertificatesAwardedToDelete({
      id: certificate.id,
      entityName: `el certificado ${certificateType(certificate?.certificate.type)} - ${certificate.certificate.name}`,
      entityType: "student",
      navigate: pathname,
    });
  };

  const { page, section, image, textContainer } = styles;
  const fullNameAndIdentityNumber = `${certificate?.user.name} ${certificate?.user.surname}, ${certificate?.user?.identifyType}: ${certificate?.user?.identifyNumber}`;

  return (
    <>
      <tr>
        <td>{certificate?.user.name + " " + certificate?.user.surname}</td>
        <td>{certificateType(certificate?.certificate.type)}</td>
        <td>{certificate?.certificate?.name}</td>
        <td>{certificate?.job ? certificate?.job?.name : "-"}</td>
        <td className="">
          <PDFDownloadLink
            document={
              <Document>
                <Page size="A4" orientation="landscape">
                  <View style={page}>
                    <View style={section}>
                      <Image src={certificateLogo} style={image} />
                      <View style={textContainer}>
                        {certificate?.certificate?.type === 1 ? (
                          <PersonalCertificatePdf
                            user={fullNameAndIdentityNumber}
                            certificate={certificate?.certificate}
                          />
                        ) : (
                          <JobCertificatePdf
                            certificate={certificate?.certificate}
                            job={certificate?.job}
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
        <td>
          <ClicapTooltip tooltip={true} text={"Eliminar certificado"}>
            <i
              type="button"
              className="fa-solid fa-trash-can color-icon-error icon-size-table btn-delete-table"
              onClick={deleteCertificate}
            ></i>
          </ClicapTooltip>
        </td>
      </tr>
    </>
  );
};