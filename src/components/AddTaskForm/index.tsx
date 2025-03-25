import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { v4 as uuid } from 'uuid'
import { Task } from '../../types'
import { styles } from './styles'

interface AddTaskFormProps {
  onSubmit: (task: Task) => void
  onCancel?: () => void
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = () => {
    if (!title.trim()) return

    const newTask: Task = {
      id: uuid(),
      icon: 'checkbox-blank-circle-outline',
      title: title.trim(),
      description: description.trim(),
      completed: false,
      tags: [],
      reminder: [],
    }

    onSubmit(newTask)
    setTitle('')
    setDescription('')
  }

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Add a new task</Text>
      <TextInput
        style={styles.input}
        placeholder="Task title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Description (optional)"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <View style={styles.buttonContainer}>
        {onCancel && (
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}