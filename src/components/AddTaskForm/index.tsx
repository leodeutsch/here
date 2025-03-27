import { Picker } from '@react-native-picker/picker'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  TextInput as RNTextInput,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates'
import { v4 as uuid } from 'uuid'
import { useTags } from '../../hooks/useTags'
import { Task } from '../../types'
import { styles } from './styles'

interface AddTaskFormProps {
  onSubmit: (task: Task) => void
  onCancel?: () => void
  focusOnMount?: boolean
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({
  onSubmit,
  onCancel,
  focusOnMount = false,
}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState('checkbox-blank-circle-outline')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [reminderDate, setReminderDate] = useState<Date>(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [showIconMenu, setShowIconMenu] = useState(false)
  const [showTagMenu, setShowTagMenu] = useState(false)

  const { tags } = useTags()
  const titleInputRef = useRef<RNTextInput>(null)

  useEffect(() => {
    if (focusOnMount && titleInputRef.current) {
      // Add a small delay to ensure the component is fully rendered
      const timer = setTimeout(() => {
        titleInputRef.current?.focus()
      }, 100) // 300ms delay to allow for sheet animation

      return () => clearTimeout(timer)
    }
  }, [focusOnMount])

  const handleSubmit = () => {
    if (!title.trim()) return

    const newTask: Task = {
      id: uuid(),
      icon,
      title: title.trim(),
      description: description.trim(),
      completed: false,
      tags: selectedTag ? [tags.find((tag) => tag.id === selectedTag)!] : [],
      reminder: reminderDate
        ? [
            {
              id: uuid(),
              when: [
                {
                  id: uuid(),
                  day: reminderDate.toDateString(),
                  time: reminderDate.toTimeString().slice(0, 8),
                },
              ],
            },
          ]
        : [],
    }

    onSubmit(newTask)
    resetForm()
  }

  const onConfirmDate = useCallback(
    (params: any) => {
      setShowDatePicker(false)
      if (params.date) {
        const newDate = new Date(params.date)
        setReminderDate(newDate)
      }
    },
    [setShowDatePicker, setReminderDate],
  )

  const onConfirmTime = useCallback(
    ({ hours, minutes }: { hours: number; minutes: number }) => {
      setShowTimePicker(false)
      const newDate = new Date(reminderDate)
      newDate.setHours(hours)
      newDate.setMinutes(minutes)
      setReminderDate(newDate)
    },
    [setShowTimePicker, setReminderDate, reminderDate],
  )

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setIcon('checkbox-blank-circle-outline')
    setSelectedTag(null)
    setReminderDate(new Date())
  }

  return (
    <ScrollView style={styles.formContainer}>
      <TextInput
        ref={titleInputRef}
        style={styles.input}
        placeholder="What do you want to do?"
        value={title}
        onChangeText={setTitle}
        autoFocus={focusOnMount}
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
      />
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Description (optional)"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Picker
        selectedValue={icon}
        onValueChange={(itemValue: React.SetStateAction<string>) =>
          setIcon(itemValue)
        }
        style={styles.picker}
      >
        <Picker.Item
          label="Default"
          value="checkbox-blank-circle-outline"
        />
        <Picker.Item
          label="Star"
          value="star-outline"
        />
        <Picker.Item
          label="Heart"
          value="heart-outline"
        />
        {/* Add more icon options as needed */}
      </Picker>
      <Picker
        selectedValue={selectedTag}
        onValueChange={(itemValue: React.SetStateAction<string | null>) =>
          setSelectedTag(itemValue)
        }
        style={styles.picker}
      >
        <Picker.Item
          label="Select a tag"
          value={null}
        />
        {tags.map((tag) => (
          <Picker.Item
            key={tag.id}
            label={tag.name}
            value={tag.id}
          />
        ))}
      </Picker>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>Set Reminder: {reminderDate?.toLocaleString()}</Text>
      </TouchableOpacity>
      <DatePickerModal
        locale="en"
        mode="single"
        visible={showDatePicker}
        presentationStyle="pageSheet"
        onDismiss={() => setShowDatePicker(false)}
        date={reminderDate}
        validRange={{ startDate: new Date() }}
        onConfirm={onConfirmDate}
      />
      <TimePickerModal
        visible={showTimePicker}
        onDismiss={() => setShowTimePicker(false)}
        onConfirm={onConfirmTime}
        hours={reminderDate.getHours()}
        minutes={reminderDate.getMinutes()}
      />
      <View style={styles.buttonContainer}>
        {onCancel && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onCancel}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
