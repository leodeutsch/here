import React, { createContext, useState } from 'react'
import { Task } from '../types'

interface TaskFormContextType {
  currentTask: Partial<Task>
  updateCurrentTask: (updates: Partial<Task>) => void
  resetCurrentTask: () => void
}

export const TaskFormContext = createContext<TaskFormContextType | undefined>(
  undefined,
)

export const TaskFormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentTask, setCurrentTask] = useState<Partial<Task>>({})

  const updateCurrentTask = (updates: Partial<Task>) => {
    setCurrentTask((prev) => ({ ...prev, ...updates }))
  }

  const resetCurrentTask = () => {
    setCurrentTask({})
  }

  return (
    <TaskFormContext.Provider
      value={{ currentTask, updateCurrentTask, resetCurrentTask }}
    >
      {children}
    </TaskFormContext.Provider>
  )
}
