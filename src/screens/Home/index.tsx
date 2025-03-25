import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  Dimensions,
  Easing,
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
const DURATION_LONG2 = 300
const { height: SCREEN_HEIGHT } = Dimensions.get('window')

export const HomeScreen = () => {
  const { tasks, addTask } = useTasks()
  const { tags } = useTags()
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false)
  const translateYAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current
  const backdropOpacity = useRef(new Animated.Value(0)).current

  // Define how far user needs to drag to dismiss
  const DISMISS_THRESHOLD = 100

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to vertical gestures
        return Math.abs(gestureState.dx) < Math.abs(gestureState.dy)
      },
      onPanResponderMove: (_, gestureState) => {
        // Only allow dragging down, not up
        if (gestureState.dy > 0) {
          translateYAnim.setValue(gestureState.dy)
        }
      },
      onPanResponderRelease: (_, gestureState) => {
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
    ]).start()
  }

  const hideBottomSheet = () => {
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

  useEffect(() => {
    // Reset animation value when component mounts
    translateYAnim.setValue(SCREEN_HEIGHT)
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tasks</Text>
        <TouchableOpacity
          style={styles.addTaskButton}
          onPress={showBottomSheet}
        >
          <Text style={styles.addTaskFont}>+</Text>
        </TouchableOpacity>
      </View>
      {tasks.length === 0 ? (
        <Text style={styles.emptyText}>No tasks available</Text>
      ) : (
        tasks.map((task: Task) => (
          <TaskItem
            key={task.id}
            task={task}
          />
        ))
      )}

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
              />
            </View>
          </Animated.View>
        </>
      )}
    </View>
  )
}
