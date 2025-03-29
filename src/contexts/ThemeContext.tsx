import { useMaterial3Theme } from '@pchmn/expo-material3-theme'
import React, { createContext, ReactNode, useMemo, useState } from 'react'
import { ColorSchemeName, useColorScheme } from 'react-native'
import { MD3DarkTheme, MD3LightTheme, MD3Theme } from 'react-native-paper'
import { customPalette } from '../styles/theme'
import { ColorPalette } from '../types'

interface Material3Theme {
  light: Partial<ColorPalette>
  dark: Partial<ColorPalette>
}

// Context value type
interface ThemeContextValue {
  theme: MD3Theme
  colorScheme: ColorSchemeName
  useSystemTheme: boolean
  setCustomTheme: (sourceColor: string) => void
  resetToSystemTheme: () => void
}

// Create context with default values
export const ThemeContext = createContext<ThemeContextValue>({
  theme: MD3LightTheme,
  colorScheme: 'light',
  useSystemTheme: true,
  setCustomTheme: () => {},
  resetToSystemTheme: () => {},
})

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const colorScheme = useColorScheme() // 'light' | 'dark' | null
  const [useSystemTheme, setUseSystemTheme] = useState<boolean>(true)
  const { theme: m3Theme, updateTheme } = useMaterial3Theme({
    fallbackSourceColor: '#4750c8', // Sage Green
  }) as { theme: Material3Theme; updateTheme: (sourceColor: string) => void }

  // Combine Material 3 theme with custom palette
  const theme = useMemo<MD3Theme>(() => {
    const baseTheme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme
    const customColors = useSystemTheme
      ? m3Theme[colorScheme || 'light'] // Default to light if null
      : customPalette[colorScheme || 'light']

    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        ...customColors,
        primary: customColors.primary ?? baseTheme.colors.primary, // Ensure primary is never undefined
      },
    }
  }, [colorScheme, useSystemTheme, m3Theme])

  // Function to switch to a custom color dynamically
  const setCustomTheme = (sourceColor: string) => {
    setUseSystemTheme(false)
    updateTheme(sourceColor)
  }

  // Reset to system theme
  const resetToSystemTheme = () => {
    setUseSystemTheme(true)
  }

  const value: ThemeContextValue = {
    theme,
    colorScheme,
    useSystemTheme,
    setCustomTheme,
    resetToSystemTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
