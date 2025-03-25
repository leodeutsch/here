import React from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { TagProvider } from './src/contexts/TagContext'
import { TaskProvider } from './src/contexts/TaskContext'
import { Navigation } from './src/navigation'
import { COLORS } from './src/styles/theme'

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider style={styles.container}>
        <TaskProvider>
          <TagProvider>
            <StatusBar
              barStyle="dark-content"
              backgroundColor={COLORS.BACKGROUND}
            />
            <Navigation />
          </TagProvider>
        </TaskProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  }
})

export default App
