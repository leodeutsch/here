import AsyncStorage from '@react-native-async-storage/async-storage'
import { Statistics } from '../types/statistics.type'

const STATISTICS_KEY = 'APP_STATISTICS'

export const getStatistics = async (): Promise<Statistics> => {
  const statisticsString = await AsyncStorage.getItem(STATISTICS_KEY)
  if (statisticsString) {
    return JSON.parse(statisticsString)
  }
  return {
    tasksCreated: 0,
    tasksCompleted: 0,
    tasksDeleted: 0,
    completionRate: 0,
  }
}

export const updateStatistics = async (
  updater: (stats: Statistics) => Statistics,
): Promise<Statistics> => {
  const currentStats = await getStatistics()
  const newStats = updater(currentStats)
  await AsyncStorage.setItem(STATISTICS_KEY, JSON.stringify(newStats))
  return newStats
}

export const incrementTasksCreated = () =>
  updateStatistics((stats) => ({
    ...stats,
    tasksCreated: stats.tasksCreated + 1,
    completionRate:
      stats.tasksCreated > 0
        ? (stats.tasksCompleted / stats.tasksCreated) * 100
        : 0,
  }))

export const incrementTasksCompleted = () =>
  updateStatistics((stats) => ({
    ...stats,
    tasksCompleted: stats.tasksCompleted + 1,
    completionRate: ((stats.tasksCompleted + 1) / stats.tasksCreated) * 100,
  }))

export const incrementTasksDeleted = () =>
  updateStatistics((stats) => ({
    ...stats,
    tasksDeleted: stats.tasksDeleted + 1,
  }))

export const resetStatistics = async () => {
  await AsyncStorage.removeItem(STATISTICS_KEY)
  await AsyncStorage.setItem(
    STATISTICS_KEY,
    JSON.stringify({
      tasksCreated: 0,
      tasksCompleted: 0,
      tasksDeleted: 0,
      completionRate: 0,
    }),
  )
}
