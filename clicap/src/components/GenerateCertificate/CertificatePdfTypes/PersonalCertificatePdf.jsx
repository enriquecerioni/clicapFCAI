import React from "react";
import { Text, Font, View, StyleSheet } from "@react-pdf/renderer";
import customFont1 from "../../../fonts/Roboto-Bold.ttf";
import customFont2 from "../../../fonts/Roboto-Regular.ttf";

export const PersonalCertificatePdf = ({ user = "", certificate = {} }) => {
  // Register font
  Font.register({
    family: "Roboto-Bold",
    src: customFont1,
  });

  Font.register({
    family: "Roboto-Regular",
    src: customFont2,
  });

  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#ffffff",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    textContainerFirst: {
      display: "flex",
      flexDirection: "column",
      margin: "0 10px 0 10px",
    },
    userNameStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    introTextContainer: {
      marginTop: "15px",
      marginBottom: "15px",
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
  } = styles;

  return (
    <View style={section}>
      <View style={textContainerFirst}>
        <Text style={fontRegular}>Certificamos que:</Text>

        <View style={userNameStyle}>
          <Text style={fwBold}>{user}</Text>
        </View>

        <View style={introTextContainer}>
          <Text style={fontRegular}>{certificate?.introtext}</Text>
        </View>

        <View style={userNameStyle}>
          <Text style={fwBold}>{certificate?.jobtext}</Text>
        </View>

        <View style={introTextContainer}>
          <Text style={fontRegular}>{certificate?.text}</Text>
        </View>
      </View>
    </View>
  );
};
