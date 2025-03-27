import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { CustomNavBar, TabItem } from '../components/CustomNavBar'
import { History } from '../screens/History'
import { HomeScreen } from '../screens/Home'
import { Profile } from '../screens/Profile'
import { TagsScreen } from '../screens/Tags'
import { COLORS } from '../styles/theme'
// import { TaskDetails } from '../screens/TaskDetails'

const Stack = createNativeStackNavigator()

export const Navigation = () => {
  // Cores da aplicação
  const primaryColor = COLORS.PRIMARY
  const backgroundColor = COLORS.BACKGROUND
  const inactiveColor = COLORS.INACTIVE

  const [activeTab, setActiveTab] = useState('Tasks')

  // Define tabs config
  const tabs: TabItem[] = [
    { name: 'Tasks', icon: 'task-alt' },
    { name: 'Tags', icon: 'tag' },
    { name: 'Logs', icon: 'pending-actions' },
    { name: 'Profile', icon: 'person-outline' }, // TODO: check how to make the settings tab
  ]

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName)
  }

  // Main screen based on active tab
  const MainScreen = () => {
    switch (activeTab) {
      case 'Tasks':
        return <HomeScreen />
      case 'Tags':
        return <TagsScreen />
      case 'Logs':
        return <History />
      case 'Profile':
        return <Profile />
      default:
        return <HomeScreen />
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#ffffff' },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="Main">
          {() => (
            <View style={styles.container}>
              <View style={styles.screenContainer}>
                <MainScreen />
              </View>

              <CustomNavBar
                activeTab={activeTab}
                onTabPress={handleTabPress}
                tabs={tabs}
                primaryColor={primaryColor}
                inactiveColor={inactiveColor}
              />
            </View>
          )}
        </Stack.Screen>

        {/* Task Details Screen with Material 3 container transform animation */}
        {/* <Stack.Screen 
          name="TaskDetails" 
          component={TaskDetails}
          options={{
            headerShown: false,
            animation: 'fade',
            presentation: 'transparentModal',
            contentStyle: {
              backgroundColor: '#ffffff',
            }
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
})
