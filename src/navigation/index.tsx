import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useMemo, useState } from 'react'
import { View } from 'react-native'

import { MD3Theme } from 'react-native-paper'
import { CustomNavBar, TabItem } from '../components/CustomNavBar'
import { useTheme } from '../hooks/useTheme'
import { History } from '../screens/History'
import { HomeScreen } from '../screens/Home'
import { Profile } from '../screens/Profile'
import { TagsScreen } from '../screens/Tags'
import { createThemedStyles } from '../util/themedStyle'
// import { TaskDetails } from '../screens/TaskDetails'

const Stack = createNativeStackNavigator()

export const Navigation = () => {
  const { theme } = useTheme()
  const styles = useMemo(() => navStyles(theme), [theme])
  // Cores da aplicação
  const primaryColor = theme.colors.primary
  const backgroundColor = theme.colors.background
  const inactiveColor = theme.colors.outline

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
          contentStyle: { backgroundColor: backgroundColor },
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

const navStyles = createThemedStyles((theme: MD3Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}))
