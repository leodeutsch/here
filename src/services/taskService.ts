import AsyncStorage from '@react-native-async-storage/async-storage'
import { Task } from '../types'

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
  return newTasks
}

export const updateTask = async (updatedTask: Task): Promise<Task[]> => {
  const tasks = await getTasks()
  const newTasks = tasks.map((task) =>
    task.id === updatedTask.id ? updatedTask : task,
  )
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(newTasks))
  return newTasks
}

export const deleteTask = async (id: string): Promise<Task[]> => {
  const tasks = await getTasks()
  const newTasks = tasks.filter((task) => task.id !== id)
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(newTasks))
  return newTasks
}
