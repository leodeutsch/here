import { MaterialIcons } from '@expo/vector-icons'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Animated,
  Dimensions,
  Easing,
  Keyboard,
  PanResponder,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import 'react-native-get-random-values'
import { AddTaskForm } from '../../components/AddTaskForm'
import { TaskItem } from '../../components/TaskItem'
import { useTags } from '../../hooks/useTags'
import { useTasks } from '../../hooks/useTasks'
import { Task } from '../../types'
import { styles } from './styles'

const EMPHASIZED_EASING = Easing.bezier(0.2, 0, 0, 1)
const DURATION_LONG2 = 400
const { height: SCREEN_HEIGHT } = Dimensions.get('window')

export const HomeScreen = () => {
  const { tasks, addTask, updateTask, loadTasks } = useTasks()
  const { tags } = useTags()
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false)
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

  const showBottomSheet = () => {
    setIsBottomSheetVisible(true)
    Animated.parallel([
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: DURATION_LONG2,
        easing: EMPHASIZED_EASING,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: DURATION_LONG2 * 0.7,
        easing: EMPHASIZED_EASING,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Wait for animation to complete before attempting to show keyboard
      setTimeout(() => {
        // This slight delay ensures the bottom sheet is fully rendered
        Keyboard.scheduleLayoutAnimation({
          duration: 100,
          easing: 'linear',
          endCoordinates: Keyboard.metrics() || {
            screenX: 0,
            screenY: 0,
            width: 100,
            height: 100,
          },
        })
      }, 100)
    })
  }

  const hideBottomSheet = () => {
    Keyboard.dismiss()
    Animated.parallel([
      Animated.timing(translateYAnim, {
        toValue: SCREEN_HEIGHT,
        duration: DURATION_LONG2,
        easing: EMPHASIZED_EASING,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: DURATION_LONG2 * 0.7,
        easing: EMPHASIZED_EASING,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsBottomSheetVisible(false)
    })
  }

  const handleAddTask = (task: Task) => {
    addTask(task)
    hideBottomSheet()
  }

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tasks</Text>
      </View>
      {tasks.filter((t: Task) => !t.completed).length === 0 ? (
        <Text style={styles.emptyText}>No tasks available</Text>
      ) : (
        tasks
          .filter((t: Task) => !t.completed)
          .map((task: Task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
            />
          ))
      )}
      <Animated.View style={[styles.fab, fabStyle]}>
        <TouchableOpacity onPress={showBottomSheet}>
          <MaterialIcons
            name="add"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </Animated.View>

      {isBottomSheetVisible && (
        <>
          <Animated.View
            style={[styles.backdrop, { opacity: backdropOpacity }]}
            onTouchEnd={hideBottomSheet}
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
              <AddTaskForm
                onSubmit={handleAddTask}
                onCancel={hideBottomSheet}
                focusOnMount={true}
              />
            </View>
          </Animated.View>
        </>
      )}
    </View>
  )
}
