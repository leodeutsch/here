import { ReactNode } from "react";

export type ThemeContextType = {
  theme: string;
  toggleTheme: (newTheme: string) => void;
};

export type ThemeProviderProps = {
  children: ReactNode;
};
