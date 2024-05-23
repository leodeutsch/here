import { StyleSheet } from "react-native";

export const createStyle = (theme: string) =>
  StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: theme === "dark" ? "#48998F" : "#35716a",
      borderRadius: 5,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 3,
        height: 3,
      },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 3,
    },
    name: {
      flex: 1,
      fontSize: 16,
      color: "#FFF",
      marginLeft: 16,
    },
    buttonText: {
      color: "#FFF",
      fontSize: 25,
    },
    button: {
      width: 56,
      height: 56,
      borderRadius: 5,
      backgroundColor: theme === "dark" ? "#BA3B4E" : "#000",
      alignItems: "center",
      justifyContent: "center",
    },
    checkButton: {
      width: 56,
      height: 56,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    checkButtonText: {
      color: "#FFF",
      fontSize: 15,
    },
    checkedText: {
      textDecorationLine: "line-through",
      textDecorationStyle: "solid",
      color: "#fff",
      flex: 1,
      fontSize: 16,
      marginLeft: 16,
    },
    uncheckedText: {
      color: "#fff",
      flex: 1,
      fontSize: 16,
      marginLeft: 16,
    },
  });
