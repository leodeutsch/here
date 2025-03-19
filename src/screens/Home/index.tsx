import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid'
import { TaskItem } from '../../components/TaskItem'
import { useTags } from '../../hooks/useTags'
import { useTasks } from '../../hooks/useTasks'
import { Task } from '../../types'
import { styles } from './styles'

export const HomeScreen = () => {
  const { tasks, addTask } = useTasks()
  const { tags } = useTags()

  const handleAddTask = () => {
    const newTask: Task = {
      id: uuid(),
      icon: 'apple',
      title: 'Testing Task',
      completed: false,
      tags: [
        {
          id: 'jdhasjdha',
          name: 'Test',
        },
      ],
      description: 'Description test',
      reminder: [
        {
          id: uuid(),
          when: [
            {
              id: new Date(),
              day: new Date().getDate().toString(),
              time: new Date().toString(),
            },
          ],
        },
      ],
    }

    addTask(newTask)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tasks</Text>
        <TouchableOpacity
          style={styles.addTaskButton}
          onPress={handleAddTask}
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
    </View>
  )
}
