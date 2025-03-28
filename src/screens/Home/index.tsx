import { MaterialIcons } from '@expo/vector-icons'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  Keyboard,
  PanResponder,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import 'react-native-get-random-values'
import { AddTaskForm } from '../../components/AddTaskForm'
import { CalendarSheet } from '../../components/CalendarSheet'
import { TaskItem } from '../../components/TaskItem'
import { useBottomSheet } from '../../hooks/useBottomSheet'
import { useTaskForm } from '../../hooks/useTaskForm'
import { useTasks } from '../../hooks/useTasks'
import { Task } from '../../types'
import { styles } from './styles'

const EMPHASIZED_EASING = Easing.bezier(0.2, 0, 0, 1)
const DURATION_LONG2 = 400
const { height: SCREEN_HEIGHT } = Dimensions.get('window')

export const HomeScreen = () => {
  const { tasks, addTask, updateTask, loadTasks } = useTasks()
  const { isVisible, content, showBottomSheet, hideBottomSheet } =
    useBottomSheet()
  const { resetCurrentTask } = useTaskForm()
  const [showFab, setShowFab] = useState(true)
  const translateYAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current
  const backdropOpacity = useRef(new Animated.Value(0)).current
  const fabAnimation = useRef(new Animated.Value(0)).current

  const fabStyle = {
    transform: [
      {
        scale: fabAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
    ],
    opacity: fabAnimation,
  }

  // Define how far user needs to drag to dismiss
  const DISMISS_THRESHOLD = 100

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (gestureState: any) => {
        // Only respond to vertical gestures
        return Math.abs(gestureState.dx) < Math.abs(gestureState.dy)
      },
      onPanResponderMove: (gestureState: any) => {
        // Only allow dragging down, not up
        if (gestureState.dy > 0) {
          translateYAnim.setValue(gestureState.dy)
        }
      },
      onPanResponderRelease: (gestureState: any) => {
        if (gestureState.dy > DISMISS_THRESHOLD) {
          // User dragged down enough to dismiss
          hideBottomSheet()
        } else {
          // Reset position
          Animated.spring(translateYAnim, {
            toValue: 0,
            useNativeDriver: true,
            friction: 8,
          }).start()
        }
      },
    }),
  ).current

  const showBottomSheetAnimated = () => {
    Animated.parallel([
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: DURATION_LONG2 * 0.4,
        easing: EMPHASIZED_EASING,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: DURATION_LONG2 * 0.6,
        easing: EMPHASIZED_EASING,
        useNativeDriver: true,
      }),
    ]).start()
  }

  const hideBottomSheetAnimated = () => {
    Keyboard.dismiss()
    Animated.parallel([
      Animated.timing(translateYAnim, {
        toValue: SCREEN_HEIGHT,
        duration: DURATION_LONG2 * 0.4,
        easing: EMPHASIZED_EASING,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: DURATION_LONG2 * 0.6,
        easing: EMPHASIZED_EASING,
        useNativeDriver: true,
      }),
    ]).start(() => {
      hideBottomSheet()
    })
  }

  useEffect(() => {
    if (isVisible) {
      showBottomSheetAnimated()
    } else {
      hideBottomSheetAnimated()
    }
  }, [isVisible, showBottomSheetAnimated, hideBottomSheetAnimated])

  const renderBottomSheetContent = () => {
    switch (content) {
      case 'addTask':
        return <AddTaskForm />
      case 'calendar':
        return <CalendarSheet />
      default:
        return null
    }
  }

  // const handleAddTask = (task: Task) => {
  //   addTask(task)
  //   hideBottomSheet()
  //   resetCurrentTask()
  // }

  const handleToggleComplete = useCallback(
    (taskId: string, completed: boolean, completedAt: Date) => {
      const task = tasks.find((t: Task) => t.id === taskId)
      if (task) {
        const updatedTask = {
          ...task,
          completed,
          completedAt: completed ? completedAt : undefined,
        }
        Promise.resolve(updateTask(updatedTask))
          .then(() => {
            setTimeout(() => {
              loadTasks()
            }, 3000)
          })
          .catch((error) => {
            console.error('Error updating task:', error)
          })
      }
    },
    [tasks, updateTask, loadTasks],
  )

  useEffect(() => {
    // Animate FAB when component mounts
    Animated.timing(fabAnimation, {
      toValue: 1,
      duration: 300,
      easing: EMPHASIZED_EASING,
      useNativeDriver: true,
    }).start()
  }, [])

  useEffect(() => {
    // Reset animation value when component mounts
    translateYAnim.setValue(SCREEN_HEIGHT)
  }, [])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setShowFab(false)
      },
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setShowFab(true)
      },
    )

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tasks</Text>
      </View>

      <FlatList
        style={styles.list}
        data={tasks.filter((t: Task) => !t.completed)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggleComplete={handleToggleComplete}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tasks available</Text>
        }
        contentContainerStyle={{ paddingBottom: 100 }} // Add padding at bottom for FAB
      />

      {showFab && (
        <Animated.View style={[styles.fab, fabStyle]}>
          <TouchableOpacity
            onPress={() => {
              resetCurrentTask()
              showBottomSheet('addTask')
            }}
          >
            <MaterialIcons
              name="add"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </Animated.View>
      )}

      {isVisible && (
        <>
          <Animated.View
            style={[styles.backdrop, { opacity: backdropOpacity }]}
            onTouchEnd={hideBottomSheetAnimated}
          />
          <Animated.View
            style={[
              styles.bottomSheet,
              {
                transform: [{ translateY: translateYAnim }],
              },
            ]}
          >
            <View style={styles.bottomSheetHandle}>
              <View style={styles.bottomSheetIndicator} />
            </View>
            <View {...panResponder.panHandlers}>
              {renderBottomSheetContent()}
            </View>
          </Animated.View>
        </>
      )}
    </View>
  )
}
