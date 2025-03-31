import { MaterialIcons } from '@expo/vector-icons'
import React, { useEffect, useMemo, useRef } from 'react'
import {
  Animated,
  Platform,
  Pressable,
  Text,
  UIManager,
  View,
} from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { navBarStyles } from './style'

// Enable LayoutAnimation for Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export interface TabItem {
  name: string
  icon: React.ComponentProps<typeof MaterialIcons>['name']
}

interface CustomNavBarProps {
  activeTab: string
  onTabPress: (tabName: string) => void
  tabs: TabItem[]
  primaryColor: string
  inactiveColor: string
}

export const CustomNavBar = ({
  activeTab,
  onTabPress,
  tabs,
  primaryColor,
  inactiveColor,
}: CustomNavBarProps) => {
  const { theme } = useTheme()
  const styles = useMemo(() => navBarStyles(theme), [theme])

  const themeActiveColor = theme.colors.primary
  const themeInactiveColor = theme.colors.outline

  const renderTabItem = (tab: TabItem) => {
    const isActive = activeTab === tab.name
    const color = isActive ? themeActiveColor : themeInactiveColor

    // Animation values
    const animatedWidth = useRef(new Animated.Value(isActive ? 1 : 0)).current
    const animatedOpacity = useRef(new Animated.Value(isActive ? 1 : 0)).current

    useEffect(() => {
      Animated.parallel([
        Animated.timing(animatedWidth, {
          toValue: isActive ? 1 : 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(animatedOpacity, {
          toValue: isActive ? 1 : 0,
          duration: 150,
          useNativeDriver: false,
        }),
      ]).start()
    }, [isActive])

    return (
      <Pressable
        key={tab.name}
        style={styles.tabItem}
        onPress={() => onTabPress(tab.name)}
        android_ripple={{
          color: theme.colors.surfaceVariant,
          borderless: true,
        }}
      >
        <MaterialIcons
          name={tab.icon}
          color={color}
          size={24}
        />

        {/* Animated visible text */}
        <Animated.View
          style={{
            width: animatedWidth.interpolate({
              inputRange: [0, 1],
              outputRange: [0, tab.name.length * 7 + 8],
            }),
            opacity: animatedOpacity,
            overflow: 'hidden',
          }}
        >
          <Text
            style={[styles.tabLabel, { color }]}
            numberOfLines={1}
          >
            {tab.name}
          </Text>
        </Animated.View>
      </Pressable>
    )
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {tabs.map((tab) => renderTabItem(tab))}
      </View>
    </View>
  )
}
