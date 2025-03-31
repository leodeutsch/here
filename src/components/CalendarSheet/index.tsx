import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import React, { useMemo, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Calendar, DateData } from 'react-native-calendars'
import { TimePickerModal } from 'react-native-paper-dates'
import { useBottomSheet } from '../../hooks/useBottomSheet'
import { useTaskForm } from '../../hooks/useTaskForm'
import { useTheme } from '../../hooks/useTheme'
import { calendarSheetStyles, calendarTheme } from './styles'

export const CalendarSheet: React.FC = () => {
  const { theme } = useTheme()
  const styles = useMemo(() => calendarSheetStyles(theme), [theme])
  const { currentTask, updateCurrentTask } = useTaskForm()
  const { hideBottomSheet, showBottomSheet } = useBottomSheet()
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string | null>(
    currentTask.scheduledAt || null,
  )

  const selectedDateObj = selectedDate ? new Date(selectedDate) : new Date()

  const handleDateSelect = (date: DateData) => {
    const newDate = selectedDate ? new Date(selectedDate) : new Date()
    newDate.setFullYear(date.year)
    newDate.setMonth(date.month - 1)
    newDate.setDate(date.day)

    setSelectedDate(newDate.toISOString())
  }

  const onConfirmTime = ({
    hours,
    minutes,
  }: {
    hours: number
    minutes: number
  }) => {
    const newDate = selectedDate ? new Date(selectedDate) : new Date()
    newDate.setHours(hours)
    newDate.setMinutes(minutes)

    setSelectedDate(newDate.toISOString())
    setShowTimePicker(false)
  }

  const toMarkedDates = () => {
    if (!selectedDate) return {}

    const date = new Date(selectedDate)
    const dateString = date.toISOString().split('T')[0] // YYYY-MM-DD

    return {
      [dateString]: {
        selected: true,
        marked: false,
        selectedColor: theme.colors.primary,
      },
    }
  }

  const handleSave = () => {
    updateCurrentTask({
      ...currentTask,
      scheduledAt: selectedDate ?? undefined,
    })

    // Go back to the task form
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
            color={theme.colors.onSurface}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSave}
          style={styles.headerButton}
        >
          <MaterialIcons
            name="check"
            size={24}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      </View>

      <Calendar
        disableAllTouchEventsForDisabledDays={true}
        current={new Date().toISOString().split('T')[0]}
        onDayPress={handleDateSelect}
        markedDates={toMarkedDates()}
        renderArrow={(direction: any) => (
          <MaterialIcons
            name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
            size={24}
            color={theme.colors.primary}
          />
        )}
        theme={calendarTheme(theme)}
        style={styles.calendar}
      />

      <View style={styles.timePickerContainer}>
        <Text style={styles.timePickerLabel}>Reminder Time:</Text>
        <TouchableOpacity
          onPress={() => setShowTimePicker(true)}
          style={styles.timePickerButton}
        >
          <Text style={styles.timePickerButtonText}>
            {selectedDate
              ? selectedDateObj.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'Set Time'}
          </Text>
          <MaterialIcons
            name="access-time"
            size={24}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      </View>

      {showTimePicker && (
        <TimePickerModal
          visible={showTimePicker}
          onDismiss={() => setShowTimePicker(false)}
          onConfirm={onConfirmTime}
          hours={selectedDateObj.getHours()}
          minutes={selectedDateObj.getMinutes()}
          use24HourClock={false}
        />
      )}
    </View>
  )
}
