import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { ThemeContextType, ThemeProviderProps } from "../../types/Theme";

const defaultValue: ThemeContextType = {
  theme: "",
  toggleTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(defaultValue);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const getTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("theme");
        if (savedTheme) {
          setTheme(savedTheme);
        } else {
          const systemTheme = colorScheme;
          if (systemTheme) {
            setTheme(systemTheme);
          }
        }
      } catch (error) {
        console.log("Error loading theme:", error);
      }
    };

    getTheme();
  }, [colorScheme]);

  const toggleTheme = (newTheme: string) => {
    setTheme(newTheme);
    AsyncStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
