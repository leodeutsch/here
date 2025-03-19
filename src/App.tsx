import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import { ThemeProvider } from 'react-native-paper'
import { TagProvider } from './contexts/TagContext'
import { TaskProvider } from './contexts/TaskContext'
import { Navigation } from './navigation'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ThemeProvider>
        <TaskProvider>
          <TagProvider>
            <StatusBar
              barStyle="dark-content"
              backgroundColor="#ffffff"
            />
            <Navigation />
          </TagProvider>
        </TaskProvider>
      </ThemeProvider>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
})
