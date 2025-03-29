import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import React, { useEffect, useMemo, useRef } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { v4 as uuid } from 'uuid'
import { useBottomSheet } from '../../hooks/useBottomSheet'
import { useTaskForm } from '../../hooks/useTaskForm'
import { useTasks } from '../../hooks/useTasks'
import { useTheme } from '../../hooks/useTheme'
import { Task } from '../../types'
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
  const { currentTask, updateCurrentTask } = useTaskForm()
  const { showBottomSheet, hideBottomSheet } = useBottomSheet()
  const { addTask } = useTasks()
  const inputRef = useRef<TextInput>(null)

  useEffect(() => {
    // Focus the input when the component mounts
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }, [])

  const handleSubmit = () => {
    if (currentTask.title?.trim()) {
      const taskToCreate = {
        ...initialTaskState,
        id: uuid(),
        icon: currentTask.icon || 'list',
        title: currentTask.title || '',
      }
      addTask(taskToCreate)
      hideBottomSheet()
    }
  }

  const handleOpenCalendar = () => {
    Keyboard.dismiss()
    showBottomSheet('calendar')
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      enabled={false}
    >
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={styles.formContainer}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="What do you want to do?"
          value={currentTask.title}
          onChangeText={(text) => updateCurrentTask({ title: text })}
          autoFocus
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
        {/* <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Description (optional)"
          value={description}
          onChangeText={setDescription}
          multiline
        /> */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleOpenCalendar}
          >
            <MaterialIcons
              name="calendar-month"
              size={24}
              color={theme.colors.onSurface}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
