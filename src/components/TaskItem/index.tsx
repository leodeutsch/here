import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { List, Text } from 'react-native-paper'
import { useTasks } from '../../hooks/useTasks'
import { COLORS } from '../../styles/theme'
import { Task } from '../../types'
import { RootStackParamList } from '../../types/'
import { ChipComponent } from '../Chip'

interface TaskItemProps {
  task: Task
}
export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const { loadTasks, deleteTask } = useTasks()

  // Handle click to navigate to full-screen card
  const handlePress = () => {
    navigation.navigate('TaskDetails', { taskId: task.id })
  }

  // Render tags as small pills under the title
  const renderTags = () => {
    if (!task.tags || task.tags.length === 0) return null
    return (
      <View style={styles.tagsContainer}>
        {task.tags.map((tag, index) => {
          if (index < 3) {
            return (
              // <Chip
              //   key={index}
              //   style={styles.tag}
              //   mode="flat"
              // >
              //   <Text style={styles.tagText}>{tag.name}</Text>
              // </Chip>
              <ChipComponent
                key={index}
                label={tag.name}
              />
            )
          }
          return null
        })}
      </View>
    )
  }

  // Render reminder time on the right
  const renderReminder = () => {
    if (!task.reminder || task.reminder.length === 0) return null
    const now = new Date()
    const reminderDate = new Date(
      task.reminder[0].when[0].day || task.reminder[0].when[0].toString(),
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
        titleStyle={styles.title}
        description={renderTags}
        left={() => (
          <List.Icon
            icon={task.icon || 'checkbox-blank-circle-outline'}
            color="#6200ee" // MD3 primary color example
          />
        )}
        right={renderReminder}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%', // Span the full screen width
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BACKGROUND,
    elevation: 1,
    borderRadius: 32,
    marginBottom: 6,
    paddingBlock: 4,
    paddingInline: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '500', // Medium weight per MD3
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  tag: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
    marginBottom: 4,
    height: 32, // Small pill size
    paddingHorizontal: 8,
    backgroundColor: '#ababab63',
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    textAlignVertical: 'center', // For Android
  },
  reminderText: {
    fontSize: 12,
    color: '#757575', // Grey text per MD3 for secondary info
    alignSelf: 'center',
  },
})
