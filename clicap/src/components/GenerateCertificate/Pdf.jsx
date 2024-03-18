import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

export const Pdf = ({
  type = "1",
  logo = "",
  userName = "",
  author = "",
  members = "",
  jobName = "",
}) => {
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
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    text: {
      fontSize: 20,
      textAlign: "center",
      color: "black",
    },
  });

  const personalStateInitial = {
    userName: "",
    identityNumber: "",
    position: "",
  };

  const jobStateInitial = {
    author: "",
    members: "",
    jobName: "",
  };

  const [personalData, setPersonalData] = useState(personalStateInitial);
  const [jobCertificateData, setJobCertificateData] = useState(jobStateInitial);

  const loadData = () => {
    if (type === 1) {
      return setPersonalData({
        userName: userName,
        identityNumber: "",
        position: "",
      });
    }
    setJobCertificateData({
      author: author,
      members: members,
      jobName: "",
    });
  };

  useEffect(() => {
    loadData();
  }, [type]);

  return (
    <Document>
      <Page size="A4" orientation="landscape">
        <View style={styles.page}>
          <View style={styles.section}>
            <Image src={logo} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Texto centrado</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
