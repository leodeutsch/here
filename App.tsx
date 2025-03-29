import React from 'react'
import { LogBox, Platform, StatusBar, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { PaperProvider } from 'react-native-paper'
import { en, registerTranslation } from 'react-native-paper-dates'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { BottomSheetProvider } from './src/contexts/BottomSheetContext'
import { TagProvider } from './src/contexts/TagContext'
import { TaskProvider } from './src/contexts/TaskContext'
import { TaskFormProvider } from './src/contexts/TaskFormContext'
import { ThemeContext, ThemeProvider } from './src/contexts/ThemeContext'
import { Navigation } from './src/navigation'

if (Platform.OS === 'android') {
  LogBox.ignoreLogs(['Keyboard'])
  require('react-native').UIManager.setLayoutAnimationEnabledExperimental &&
    require('react-native').UIManager.setLayoutAnimationEnabledExperimental(
      true,
    )
}

const App = () => {
  registerTranslation('en', en)
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme }) => (
            <PaperProvider theme={theme}>
              <SafeAreaProvider style={styles.container}>
                <StatusBar
                  barStyle={theme.dark ? 'light-content' : 'dark-content'}
                  backgroundColor={theme.colors.background}
                />
                <BottomSheetProvider>
                  <TaskProvider>
                    <TaskFormProvider>
                      <TagProvider>
                        <Navigation />
                      </TagProvider>
                    </TaskFormProvider>
                  </TaskProvider>
                </BottomSheetProvider>
              </SafeAreaProvider>
            </PaperProvider>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
})

export default App
