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
  // .sort(
  //   (a, b) =>
  //     (b.completedAt?.getTime() || 0) - (a.completedAt?.getTime() || 0),
  // )

  const handleLongPress = async (task: Task) => {
    try {
      await deleteTask(task.id)
      loadTasks()
    } catch (error) {
      Alert.alert('Error deleting task', 'Failed to delete task')
    }
  }

  const renderItem = ({ item }: { item: Task }) => (
    <TouchableOpacity
      style={styles.taskItem}
      onLongPress={() => handleLongPress(item)}
    >
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskDate}>
        {/* Completed on: {item.completedAt?.toLocaleString()} */}
        Completed on: today
      </Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Log</Text>
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
