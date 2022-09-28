import { StyleSheet } from "react-native";

export default styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: theme.background,
    },
    inputContainer: {
      alignItems: "center",
      width: "100%",
    },
    btn: {
      alignItems: "center",
      width: "100%",
      marginBottom: 20,
    },
    margin: {
      height: 15,
    },

    registrationContainer: {
      flexDirection: "row",
      justifyContent: "center",
    },

    registrationLabel: {
      fontSize: 16,
    },

    registrationText: {
      fontSize: 16,
      fontWeight: "600",
    },

    spacer: {
      width: 10,
    },
  });
