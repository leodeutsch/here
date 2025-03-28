import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import DateTimePicker from '@react-native-community/datetimepicker'
import React, { useState } from 'react'
import { Platform, Text, TouchableOpacity, View } from 'react-native'
import { Calendar, DateData } from 'react-native-calendars'
import { useBottomSheet } from '../../hooks/useBottomSheet'
import { useTaskForm } from '../../hooks/useTaskForm'
import { COLORS } from '../../styles/theme'
import { DateType } from '../../types'
import { styles } from './styles'

export const CalendarSheet: React.FC = () => {
  const { currentTask, updateCurrentTask } = useTaskForm()
  const { hideBottomSheet, showBottomSheet } = useBottomSheet()
  const [showTimePicker, setShowTimePicker] = useState(false)

  const handleDateSelect = (date: DateData) => {
    const day = {
      year: date.year,
      month: date.month,
      date: date.day,
    }

    updateCurrentTask({
      when: {
        day: day,
      },
    })
  }

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false)
    const currentDate = selectedTime || new Date()
    setShowTimePicker(Platform.OS === 'ios')

    const time = {
      hours: selectedTime?.getHours() || 0,
      minutes: selectedTime?.getMinutes() || 0,
    }

    updateCurrentTask({
      when: {
        time,
      },
    })
  }

  const toMarkedDates = (customDate?: DateType): { [key: string]: any } => {
    if (!customDate) return {}
    const { year, month, date } = customDate
    const dateString = `${year}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}`
    return {
      [dateString]: { selected: true, marked: true, selectedColor: 'blue' },
    }
  }

  const handleSave = () => {
    showBottomSheet('addTask')
  }

  return (
    <View style={styles.container}>
      <View style={styles.sheetHeader}>
        <TouchableOpacity
          onPress={hideBottomSheet}
          style={styles.headerButton}
        >
          <MaterialIcons
            name="close"
            size={24}
            color={COLORS.INACTIVE}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSave}
          style={styles.headerButton}
        >
          <MaterialIcons
            name="check"
            size={24}
            color={COLORS.PRIMARY}
          />
        </TouchableOpacity>
      </View>

      <Calendar
        disableAllTouchEventsForDisabledDays={true}
        current={new Date().toISOString().split('T')[0]}
        onDayPress={handleDateSelect}
        markedDates={{
          [toMarkedDates(currentTask.when?.day) && '']: {
            selected: true,
            marked: true,
          },
        }}
        renderArrow={(direction: any) => (
          <MaterialIcons
            name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
            size={24}
            color={COLORS.PRIMARY}
          />
        )}
        theme={{
          todayTextColor: COLORS.PRIMARY,
          selectedDayBackgroundColor: COLORS.PRIMARY,
          textDisabledColor: COLORS.BACKGROUND,
          arrowColor: COLORS.PRIMARY,
        }}
        style={styles.calendar}
      />

      <View style={styles.timePickerContainer}>
        <Text style={styles.timePickerLabel}>Reminder Time:</Text>
        <TouchableOpacity
          onPress={() => setShowTimePicker(true)}
          style={styles.timePickerButton}
        >
          <Text style={styles.timePickerButtonText}>
            {currentTask.when?.time
              ? new Date(
                  0,
                  0,
                  0,
                  currentTask.when.time.hours,
                  currentTask.when.time.minutes,
                ).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'Set Time'}
          </Text>
          <MaterialIcons
            name="access-time"
            size={24}
            color={COLORS.PRIMARY}
          />
        </TouchableOpacity>
      </View>

      {showTimePicker && (
        <DateTimePicker
          value={
            currentTask.reminder?.[0]?.when
              ? new Date(
                  currentTask.reminder[0].when.day.year,
                  currentTask.reminder[0].when.day.month,
                  currentTask.reminder[0].when.day.date,
                  currentTask.reminder[0].when.time.hours,
                  currentTask.reminder[0].when.time.minutes,
                )
              : new Date()
          }
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </View>
  )
}
