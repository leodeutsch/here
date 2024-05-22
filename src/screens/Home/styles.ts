import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#131016",
    padding: 24,
  },
  eventName: {
    color: "#35716a",
    fontSize: 35,
    fontWeight: "bold",
    marginTop: 48,
  },
  eventDate: {
    color: "#6b6b6b",
    fontSize: 16,
  },
  input: {
    flex: 1,
    height: 56,
    // backgroundColor: "#1F1E25",
    backgroundColor: "#6b6b6b",
    borderRadius: 5,
    color: "#FFF",
    padding: 16,
    fontSize: 16,
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 5,
    backgroundColor: "#35716a",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 25,
  },
  form: {
    width: "100%",
    flexDirection: "row",
    marginTop: 40,
    marginBottom: 30,
  },
  list: {
    marginTop: 50,
  },
  emptyListText: {
    color: "#6b6b6b",
    fontSize: 20,
    textAlign: "center",
    marginTop: 50,
  },
});
