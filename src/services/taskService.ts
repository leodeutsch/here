import AsyncStorage from '@react-native-async-storage/async-storage'
import { Task } from '../types'
import {
  incrementTasksCompleted,
  incrementTasksCreated,
  incrementTasksDeleted,
} from './statisticsService'

const TASKS_KEY = '@tasks'

export const getTasks = async (): Promise<Task[]> => {
  try {
    const tasksJson = await AsyncStorage.getItem(TASKS_KEY)
    return tasksJson ? JSON.parse(tasksJson) : []
  } catch (e) {
    console.error('Error fetching tasks:', e)
    return []
  }
}

export const addTask = async (task: Task): Promise<Task[]> => {
  const tasks = await getTasks()
  const newTasks = [...tasks, task]
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(newTasks))
  await incrementTasksCreated()
  return newTasks
}

export const updateTask = async (updatedTask: Task): Promise<Task[]> => {
  const tasks = await getTasks()
  const newTasks = tasks.map((task) => {
    if (task.id === updatedTask.id) {
      if (!task.completed && updatedTask.completed) {
        incrementTasksCompleted()
      }
      return updatedTask
    }
    return task
  })
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(newTasks))
  return newTasks
}

export const deleteTask = async (id: string): Promise<Task[]> => {
  const tasks = await getTasks()
  const newTasks = tasks.filter((task) => task.id !== id)
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(newTasks))
  await incrementTasksDeleted()
  return newTasks
}
