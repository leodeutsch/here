import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInYears,
  format,
} from 'date-fns'
import React, { useMemo, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Checkbox, List, Text } from 'react-native-paper'
import { useTasks } from '../../hooks/useTasks'
import { useTheme } from '../../hooks/useTheme'
import { Task } from '../../types'
import { RootStackParamList } from '../../types/'
import { taskItemStyles } from './style'

interface TaskItemProps {
  task: Task
  onToggleComplete: (
    taskId: string,
    completed: boolean,
    completedAt: string,
  ) => void
}
export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
}) => {
  const { theme } = useTheme()
  const styles = useMemo(() => taskItemStyles(theme), [theme])
  const [isCompleted, setIsCompleted] = useState(task.completed)
  const [isCompletedPending, setIsCompletedPending] = useState(false)
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const { loadTasks, deleteTask } = useTasks()

  const handlePress = () => {
    navigation.navigate('TaskDetails', { taskId: task.id })
  }

  const handleToggleComplete = () => {
    const newCompletedState = !isCompleted
    setIsCompleted(newCompletedState)

    if (newCompletedState) {
      setIsCompletedPending(true)
      setTimeout(() => {
        setIsCompletedPending(false)
        onToggleComplete(task.id, newCompletedState, new Date().toISOString())
      }, 3000)
    } else {
      setIsCompletedPending(false)
      onToggleComplete(task.id, newCompletedState, new Date().toISOString())
    }
  }

  const renderTags = () => {
    if (!task.tags || task.tags.length === 0) return null
    return (
      <View style={styles.tagsContainer}>
        {task.tags.map((tag, index) => {
          if (index < 3) {
            return (
              <Text
                style={[
                  styles.reminderText,
                  { marginRight: 8, fontStyle: 'italic' },
                ]}
                key={tag.id}
              >
                {`${tag.name}`}
              </Text>
            )
          }
          return null
        })}
      </View>
    )
  }

  const renderRightContent = () => (
    <View style={styles.rightContent}>
      {renderReminder()}
      <Checkbox
        status={isCompleted ? 'checked' : 'unchecked'}
        onPress={handleToggleComplete}
        color={theme.colors.primary}
        uncheckedColor={theme.colors.outline}
      />
    </View>
  )

  const renderReminder = () => {
    if (!task.scheduledAt) return null

    const now = new Date()
    const reminderDate = new Date(task.scheduledAt)
    const diffMinutes = differenceInMinutes(reminderDate, now)
    const diffHours = differenceInHours(reminderDate, now)
    const diffDays = differenceInDays(reminderDate, now)
    const diffYears = differenceInYears(reminderDate, now)

    if (diffMinutes < 0)
      return <Text style={styles.reminderText}>Past due</Text>

    if (diffMinutes < 60) {
      return (
        <Text
          style={styles.reminderText}
        >{`in ${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''}`}</Text>
      )
    }

    if (diffHours < 24) {
      const remainingMinutes = diffMinutes % 60
      return (
        <Text
          style={styles.reminderText}
        >{`in ${diffHours}h ${remainingMinutes}m`}</Text>
      )
    }

    if (diffDays < 7) {
      if (diffDays === 0) return <Text style={styles.reminderText}>Today</Text>
      if (diffDays === 1)
        return <Text style={styles.reminderText}>Tomorrow</Text>
      return <Text style={styles.reminderText}>{`in ${diffDays} days`}</Text>
    }

    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7)
      return (
        <Text
          style={styles.reminderText}
        >{`in ${weeks} week${weeks !== 1 ? 's' : ''}`}</Text>
      )
    }

    if (diffYears < 1) {
      return (
        <Text style={styles.reminderText}>{format(reminderDate, 'MMM d')}</Text>
      )
    }

    return (
      <Text style={styles.reminderText}>
        {format(reminderDate, 'MMM d, yyyy')}
      </Text>
    )
  }

  const handleLongPress = async () => {
    try {
      await deleteTask(task.id)
      loadTasks()
    } catch (error) {
      console.error('Error deleting task:', error)
      // Handle error appropriately
    }
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      onLongPress={handleLongPress}
      style={[styles.container, isCompletedPending && { opacity: 0.7 }]}
    >
      <List.Item
        title={task.title}
        titleStyle={[
          styles.title,
          (isCompleted || isCompletedPending) && styles.completedTitle,
        ]}
        description={renderTags}
        descriptionNumberOfLines={1}
        left={() => (
          <List.Icon
            icon={'equal'}
            color={theme.colors.primary}
          />
        )}
        right={renderRightContent}
      />
    </TouchableOpacity>
  )
}
