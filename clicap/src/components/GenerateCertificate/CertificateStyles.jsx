import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
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
      top: "25%",
      width: "100%",
    },
    text: {
      fontSize: 20,
      textAlign: "center",
      color: "black",
    },
});