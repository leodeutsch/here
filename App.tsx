import React from 'react'
import { LogBox, Platform, StatusBar, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { en, registerTranslation } from 'react-native-paper-dates'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { BottomSheetProvider } from './src/contexts/BottomSheetContext'
import { TagProvider } from './src/contexts/TagContext'
import { TaskProvider } from './src/contexts/TaskContext'
import { TaskFormProvider } from './src/contexts/TaskFormContext'
import { Navigation } from './src/navigation'
import { COLORS } from './src/styles/theme'

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
      <SafeAreaProvider style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={COLORS.BACKGROUND}
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
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
})

export default App
