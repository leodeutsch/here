import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
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
    completedAt: Date,
  ) => void
}
export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
}) => {
  const { theme } = useTheme()
  const styles = useMemo(() => taskItemStyles(theme), [theme])
  const [isCompleted, setIsCompleted] = useState(task.completed)
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const { loadTasks, deleteTask } = useTasks()

  // Handle click to navigate to full-screen card
  const handlePress = () => {
    navigation.navigate('TaskDetails', { taskId: task.id })
  }

  const handleToggleComplete = () => {
    const newCompletedState = !isCompleted
    setIsCompleted(newCompletedState)
    onToggleComplete(task.id, newCompletedState, new Date())
  }

  // Render tags as small pills under the title
  // const renderTags = () => {
  //   if (!task.tags || task.tags.length === 0) return null
  //   return (
  //     <View style={styles.tagsContainer}>
  //       {task.tags.map((tag, index) => {
  //         if (index < 3) {
  //           return (
  //             <ChipComponent
  //               key={index}
  //               label={tag.name}
  //             />
  //           )
  //         }
  //         return null
  //       })}
  //     </View>
  //   )
  // }

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

  // Render reminder time on the right
  const renderReminder = () => {
    if (
      !task.reminder ||
      task.reminder.length === 0 ||
      task.reminder[0] === undefined ||
      []
    )
      return null
    const now = new Date()
    const reminderDate = new Date(
      task.reminder[0]?.when?.day?.year,
      task.reminder[0]?.when?.day?.month,
      task.reminder[0]?.when?.day?.date,
      task.reminder[0]?.when?.time?.hours,
      task.reminder[0]?.when?.time?.minutes,
    ) // Access date property or convert to string
    const diff = reminderDate.getTime() - now.getTime()
    if (diff <= 0) return <Text style={styles.reminderText}>Past due</Text>
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return <Text style={styles.reminderText}>{`in ${hours}h ${minutes}m`}</Text>
  }

  const handleLongPress = async () => {
    try {
      await deleteTask(task.id)
      // You might want to add some feedback here like a toast notification
      // Or refresh the task list after deletion
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
      style={styles.container}
    >
      <List.Item
        title={task.title}
        titleStyle={[styles.title, isCompleted && styles.completedTitle]}
        description={task.description}
        descriptionStyle={[
          isCompleted && styles.completedDescription,
          {
            color: isCompleted
              ? theme.colors.outline
              : theme.colors.onSurfaceVariant,
          },
        ]}
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
