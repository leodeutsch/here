import { useContext } from "react";
import { StatusBar } from "react-native";
import { ThemeContext, ThemeProvider } from "./src/context/Theme";
import { Home } from "./src/screens/Home";

const AppContent = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      />
      <Home />
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
