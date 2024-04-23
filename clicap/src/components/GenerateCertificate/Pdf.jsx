import React from "react";
import { Page, Image, View, Document, StyleSheet } from "@react-pdf/renderer";
import { PersonalCertificatePdf } from "./CertificatePdfTypes/PersonalCertificatePdf";
import { JobCertificatePdf } from "./CertificatePdfTypes/JobCertificatePdf";
import { styles } from "./CertificateStyles";

export const Pdf = ({ logo = "", user = "", certificate = {}, job = {} }) => {

  const { page, section, image, textContainer } = styles;

  return (
    <Document>
      <Page size="A4" orientation="landscape">
        <View style={page}>
          <View style={section}>
            <Image src={logo} style={image} />
            <View style={textContainer}>
              {certificate?.type === 1 ? (
                <PersonalCertificatePdf user={user} certificate={certificate} />
              ) : null}

              {certificate?.type === 2 ? (
                <JobCertificatePdf certificate={certificate} job={job} />
              ) : null}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
