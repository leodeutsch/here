import { Reminder } from './reminder.type'
import { Tag } from './tag.type'

export interface Task {
  id: string
  icon: string
  title: string
  description?: string
  reminder?: Reminder[]
  completed: boolean
  completedAt?: Date
  tags?: Tag[]
}
