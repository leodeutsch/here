import { DateType, TimeType } from './dates.type'
import { Reminder } from './reminder.type'
import { Tag } from './tag.type'

export interface WhenType {
  day?: DateType
  time?: TimeType
}

export interface Task {
  id: string
  icon: string
  title: string
  description?: string
  reminder?: Reminder[]
  when?: WhenType
  completed: boolean
  completedAt?: Date
  tags?: Tag[]
}
