import React from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { TagProvider } from './src/contexts/TagContext'
import { TaskProvider } from './src/contexts/TaskContext'
import { Navigation } from './src/navigation'
import { COLORS } from './src/styles/theme'

const App = () => {
  return (
    <SafeAreaProvider style={{ padding: 5 }}>
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
  )
}

export default App
