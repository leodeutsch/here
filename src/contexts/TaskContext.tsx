import React, { createContext, useEffect, useState } from 'react'
import {
  addTask,
  deleteTask,
  getTasks,
  updateTask,
} from '../services/taskService'
import { Task } from '../types'

interface TaskContextType {
  tasks: Task[]
  loadTasks: () => void
  addTask: (task: Task) => void
  updateTask: (task: Task) => void
  deleteTask: (id: string) => void
}

export const TaskContext = createContext<TaskContextType>({
  tasks: [],
  loadTasks: () => {},
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
})

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    handleLoadTasks()
  }, [])

  const handleLoadTasks = async () => {
    const storedTasks = await getTasks()
    setTasks(storedTasks)
  }

  const handleAddTask = async (task: Task) => {
    const newTasks = await addTask(task)
    setTasks(newTasks)
  }

  const handleUpdateTask = async (task: Task) => {
    const newTasks = await updateTask(task)
    setTasks(newTasks)
  }

  const handleDeleteTask = async (id: string) => {
    const newTasks = await deleteTask(id)
    setTasks(newTasks)
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loadTasks: handleLoadTasks,
        addTask: handleAddTask,
        updateTask: handleUpdateTask,
        deleteTask: handleDeleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
