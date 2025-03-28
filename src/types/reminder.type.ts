import { DateType, TimeType } from './dates.type'

export interface ReminderTime {
  day: DateType // weekday or specific dates
  time: TimeType // hours and minutes
}

export interface Reminder {
  id: string
  when: ReminderTime
}
