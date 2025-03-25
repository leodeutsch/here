interface WhenData {
  id: Date
  day: string // weekday or specific dates
  time: string // hours and minutes
}

export interface Reminder {
  id: string
  when: WhenData[]
}
