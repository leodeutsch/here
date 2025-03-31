import { MaterialIcons } from '@expo/vector-icons'
import React, { useMemo } from 'react'
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native'
import { useTasks } from '../../hooks/useTasks'
import { useTheme } from '../../hooks/useTheme'
import { Task } from '../../types'
import { logStyles } from './styles'

export const History = () => {
  const { tasks, loadTasks, deleteTask } = useTasks()
  const { theme } = useTheme()
  const styles = useMemo(() => logStyles(theme), [theme])

  const completedTasks = tasks.filter((t) => t.completed)

  // TODO: check a better way to handle this
  const handleLongPress = async (task: Task) => {
    try {
      await deleteTask(task.id)
      loadTasks()
    } catch (error) {
      Alert.alert('Error deleting task', 'Failed to delete task')
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const renderItem = ({ item }: { item: Task }) => (
    <TouchableOpacity
      style={styles.taskItem}
      onLongPress={() => handleLongPress(item)}
    >
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskDate}>
        {`Completed on: ${formatDate(item.completedAt)}` || 'Completed'}
      </Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Log</Text>
        <TouchableOpacity onPress={loadTasks}>
          <MaterialIcons
            name="loop"
            size={24}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      </View>
      {completedTasks.length === 0 ? (
        <Text style={styles.emptyText}>No completed tasks</Text>
      ) : (
        <FlatList
          data={completedTasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  )
}
