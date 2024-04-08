import React from "react";
import { Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import customFont1 from "../../../fonts/Roboto-Bold.ttf";
import customFont2 from "../../../fonts/Roboto-Regular.ttf";

export const JobCertificatePdf = ({ job = {}, certificate = {} }) => {
  // Register font
  Font.register({
    family: "Roboto-Bold",
    src: customFont1,
  });

  Font.register({
    family: "Roboto-Regular",
    src: customFont2,
  });

  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
    },
    section: {
      margin: "0 20px 0 20px",
    },
    textContainerFirst: {
      display: "flex",
      flexDirection: "column",
      marginTop: "20px"
    },
    userNameStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      marginTop: "15px",
    },
    introTextContainer: {
      marginTop: "15px",
      width: "100%",
    },
    fwBoldAndSize: {
      fontFamily: "Roboto-Bold",
      fontSize: "16px",
    },
    fontRegularAndSize: {
      fontFamily: "Roboto-Regular",
      fontSize: "16px",
    },
    fwBold: {
      fontFamily: "Roboto-Bold",
    },
    fontRegular: {
      fontFamily: "Roboto-Regular",
    },
  });

  const {
    section,
    textContainerFirst,
    userNameStyle,
    introTextContainer,
    fwBold,
    fontRegular,
    fwBoldAndSize,
    fontRegularAndSize,
  } = styles;

  const jobAuthor = Object.keys(job).length ? job.author : "";
  const members =
    Object.keys(job).length && job.members ? `, ${job.members}` : "";

  const fullMembers = `${jobAuthor}${members}`;

  const pr = { author: "", members: "", jobname: "" };
  const jobName = Object.keys(job).length ? job.name : "";

  const reduceLetter = fullMembers.length > 115 || jobName.length > 115;

  return (
    <View style={section}>
      <View style={textContainerFirst}>
        <Text style={reduceLetter ? fontRegularAndSize : fontRegular}>
          Certificamos que:
        </Text>

        <View style={userNameStyle}>
          <Text style={reduceLetter ? fwBoldAndSize : fwBold}>
            {fullMembers}
          </Text>
        </View>

        <View style={introTextContainer}>
          <Text style={reduceLetter ? fontRegularAndSize : fontRegular}>
            {certificate?.introtext}
          </Text>
        </View>

        <View style={userNameStyle}>
          <Text style={reduceLetter ? fwBoldAndSize : fwBold}>{job?.name}</Text>
        </View>

        <View style={introTextContainer}>
          <Text style={reduceLetter ? fontRegularAndSize : fontRegular}>
            {certificate?.text}
          </Text>
        </View>
      </View>
    </View>
  );
};
