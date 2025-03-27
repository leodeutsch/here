import React, { useState } from 'react'
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { v4 as uuid } from 'uuid'
import { useTags } from '../../hooks/useTags'
import { Tag } from '../../types'
import { styles } from './styles'

export const TagsScreen = () => {
  const { tags, addTag, updateTag, deleteTag } = useTags()
  const [newTagName, setNewTagName] = useState('')
  const [editingTag, setEditingTag] = useState<Tag | null>(null)

  const handleAddTag = () => {
    if (newTagName.trim()) {
      const newTag: Tag = {
        id: uuid(),
        name: newTagName.trim(),
      }
      addTag(newTag)
      setNewTagName('')
    }
  }

  const handleUpdateTag = () => {
    if (editingTag && editingTag.name.trim()) {
      updateTag(editingTag)
      setEditingTag(null)
    }
  }

  const handleDeleteTag = (tag: Tag) => {
    Alert.alert(
      'Delete Tag',
      `Are you sure you want to delete "${tag.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTag(tag.id),
        },
      ],
    )
  }

  const renderTagItem = ({ item }: { item: Tag }) => (
    <View style={styles.tagItem}>
      {editingTag && editingTag.id === item.id ? (
        <TextInput
          style={styles.editInput}
          value={editingTag.name}
          onChangeText={(text) => setEditingTag({ ...editingTag, name: text })}
          onBlur={handleUpdateTag}
        />
      ) : (
        <Text style={styles.tagName}>{item.name}</Text>
      )}
      <View style={styles.tagActions}>
        <TouchableOpacity onPress={() => setEditingTag(item)}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTag(item)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Tags</Text>
      <View style={styles.addTagContainer}>
        <TextInput
          style={styles.input}
          placeholder="New tag name"
          value={newTagName}
          onChangeText={setNewTagName}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddTag}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tags}
        renderItem={renderTagItem}
        keyExtractor={(item) => item.id}
        style={styles.tagList}
      />
    </View>
  )
}
