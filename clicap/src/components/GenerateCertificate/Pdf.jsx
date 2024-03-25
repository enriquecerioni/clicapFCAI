import React from "react";
import {
  Page,
  Image,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { PersonalCertificatePdf } from "./CertificatePdfTypes/PersonalCertificatePdf";
import { JobCertificatePdf } from "./CertificatePdfTypes/JobCertificatePdf";

export const Pdf = ({ logo = "", user = "", certificate = {}, job = {} }) => {
  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
    },
    section: {
      flexGrow: 1,
      position: "relative",
    },
    image: {
      width: "100%",
      height: "100%",
    },
    textContainer: {
      position: "absolute",
      top: "35%",
    },
    text: {
      fontSize: 20,
      textAlign: "center",
      color: "black",
    },
  });

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
