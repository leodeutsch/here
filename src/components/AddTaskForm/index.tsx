import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { v4 as uuid } from 'uuid'
import { useBottomSheet } from '../../hooks/useBottomSheet'
import { useTags } from '../../hooks/useTags'
import { useTaskForm } from '../../hooks/useTaskForm'
import { useTasks } from '../../hooks/useTasks'
import { useTheme } from '../../hooks/useTheme'
import { Task } from '../../types'
import { formatRelativeDate } from '../../util/dateUtils'
import { addTaskFormStyles } from './styles'

const initialTaskState: Task = {
  id: '',
  icon: '',
  title: '',
  completed: false,
}

export const AddTaskForm: React.FC = () => {
  const { theme } = useTheme()
  const styles = useMemo(() => addTaskFormStyles(theme), [theme])
  const { tags } = useTags()
  const { currentTask, updateCurrentTask } = useTaskForm()
  const { showBottomSheet, hideBottomSheet } = useBottomSheet()
  const { addTask } = useTasks()
  const inputRef = useRef<TextInput>(null)
  const expandAnimation = useRef(new Animated.Value(0)).current
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }, [])

  useEffect(() => {
    Animated.timing(expandAnimation, {
      toValue: isExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }, [isExpanded])

  const handleSubmit = () => {
    if (currentTask.title?.trim()) {
      const taskToCreate = {
        ...initialTaskState,
        id: uuid(),
        icon: currentTask.icon || 'list',
        title: currentTask.title.trim(),
        completed: false,
        scheduledAt: currentTask.scheduledAt,
        tags: currentTask.tags,
      }
      addTask(taskToCreate)
      hideBottomSheet()
    }
  }

  const handleOpenCalendar = () => {
    Keyboard.dismiss()
    showBottomSheet('calendar')
  }

  const handleOpenTagSuggestions = () => {
    Keyboard.dismiss()
    showBottomSheet('tagSuggestions')
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const expandedHeight = expandAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 80],
  })

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      enabled={false}
    >
      <View style={{ flex: 1, position: 'relative' }}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={styles.formContainer}
        >
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="What do you want to do?"
            placeholderTextColor={theme.colors.outline}
            value={currentTask.title}
            onChangeText={(text) => updateCurrentTask({ title: text })}
            autoFocus
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />
          <Animated.View
            style={[
              styles.expandedView,
              { height: expandedHeight, overflow: 'hidden' },
            ]}
          >
            <TextInput
              style={styles.descriptionInput}
              placeholder="Add description"
              placeholderTextColor={theme.colors.outline}
              value={currentTask.description}
              onChangeText={(text) => updateCurrentTask({ description: text })}
              multiline
            />
          </Animated.View>
          <Animated.View style={styles.bottomContainer}>
            <View style={styles.bottomContainerLeftSide}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={handleOpenCalendar}
              >
                <MaterialIcons
                  name="insert-invitation"
                  size={20}
                  color={
                    currentTask.scheduledAt
                      ? theme.colors.primary
                      : theme.colors.onSurfaceVariant
                  }
                />
                <Text
                  style={[
                    styles.bottomContentText,
                    currentTask.scheduledAt && { color: theme.colors.primary },
                  ]}
                >
                  {currentTask.scheduledAt
                    ? formatRelativeDate(currentTask.scheduledAt)
                    : 'Add due date'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={handleOpenTagSuggestions}
              >
                <MaterialIcons
                  name={
                    (currentTask.tags || []).length > 0
                      ? 'label-outline'
                      : 'new-label'
                  }
                  size={20}
                  color={
                    (currentTask.tags || []).length > 0
                      ? theme.colors.primary
                      : theme.colors.onSurfaceVariant
                  }
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.iconButton, { marginRight: 0 }]}
              onPress={toggleExpand}
            >
              <MaterialIcons
                name={isExpanded ? 'expand-more' : 'expand-less'}
                size={20}
                color={theme.colors.onSurfaceVariant}
              />
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}
