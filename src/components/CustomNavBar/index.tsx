import { MaterialIcons } from '@expo/vector-icons'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  Animated,
  LayoutAnimation,
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
  // State to store tab measurements
  const [tabWidths, setTabWidths] = useState<{ [key: string]: number }>({})
  const [containerWidth, setContainerWidth] = useState<number | null>(null)

  const themeActiveColor = theme.colors.primary
  const themeInactiveColor = theme.colors.outline

  // Calculate the minimum responsive width based on tab content
  const getNavBarWidth = () => {
    // Default sizes if measurements are not available yet
    if (!containerWidth) return { width: 200 }

    // Calculate using the measured widths
    // The container should be large enough to fit the active tab with its text
    // plus some space for the other icons
    const activeTabWidth = tabWidths[activeTab] || 0
    const iconBaseWidth = 40 // Base width for icon-only tabs
    const totalIconsWidth = tabs.length * iconBaseWidth
    const minWidth = Math.max(
      totalIconsWidth,
      activeTabWidth + (tabs.length - 1) * iconBaseWidth,
    )

    // Add padding for better appearance
    const responsiveWidth = minWidth + 40

    // Don't let it get too small or too large
    const minAllowedWidth = Math.min(200, containerWidth * 0.4)
    const maxAllowedWidth = Math.min(350, containerWidth * 0.8)

    return {
      width: Math.max(
        minAllowedWidth,
        Math.min(responsiveWidth, maxAllowedWidth),
      ),
      minWidth: minAllowedWidth,
    }
  }

  // Track the overall container width
  const handleContainerLayout = (event: any) => {
    const { width } = event.nativeEvent.layout
    if (width !== containerWidth) {
      setContainerWidth(width)
    }
  }

  // Measure the full width of a tab with its text visible
  const measureTabWidth = (tab: TabItem, width: number) => {
    setTabWidths((prev) => {
      if (prev[tab.name] !== width) {
        // Smoothly animate layout changes
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        return { ...prev, [tab.name]: width }
      }
      return prev
    })
  }

  const renderTabItem = (tab: TabItem, index: number) => {
    const isActive = activeTab === tab.name
    const color = isActive ? themeActiveColor : themeInactiveColor

    // Animation values
    const animatedWidth = useRef(new Animated.Value(isActive ? 1 : 0)).current
    const animatedOpacity = useRef(new Animated.Value(isActive ? 1 : 0)).current
    const fullWidthRef = useRef<View>(null)

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

        {/* Hidden full-width view to measure text size */}
        <View
          ref={fullWidthRef}
          style={[styles.measureContainer]}
          onLayout={(e) => {
            if (fullWidthRef.current) {
              const width = e.nativeEvent.layout.width + 40 // Add some padding
              measureTabWidth(tab, width)
            }
          }}
        >
          <MaterialIcons
            name={tab.icon}
            color="transparent"
            size={24}
          />
          <Text style={[styles.tabLabel, { opacity: 0 }]}>{tab.name}</Text>
        </View>

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
    <View
      style={styles.outerContainer}
      onLayout={handleContainerLayout}
    >
      <View style={[styles.container, getNavBarWidth()]}>
        {tabs.map((tab, index) => renderTabItem(tab, index))}
      </View>
    </View>
  )
}
