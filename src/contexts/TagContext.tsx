import React, { createContext, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { addTag, deleteTag, getTags, updateTag } from '../services/tagService'
import { Tag } from '../types'

interface TagContextType {
  tags: Tag[]
  addTag: (tagName: string) => void
  updateTag: (tag: Tag) => void
  deleteTag: (id: string) => void
}

export const TagContext = createContext<TagContextType>({
  tags: [],
  addTag: () => {},
  updateTag: () => {},
  deleteTag: () => {},
})

export const TagProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tags, setTags] = useState<Tag[]>([])

  useEffect(() => {
    const loadTags = async () => {
      const storedTags = await getTags()
      setTags(storedTags)
    }
    loadTags()
  }, [])

  const handleAddTag = async (tagName: string) => {
    const tag: Tag = {
      id: uuid(),
      name: tagName,
    }
    const newTags = await addTag(tag)
    setTags(newTags)
  }

  const handleUpdateTag = async (tag: Tag) => {
    const updatedTags = await updateTag(tag)
    setTags(updatedTags)
  }

  const handleDeleteTag = async (id: string) => {
    const updatedTags = await deleteTag(id)
    setTags(updatedTags)
  }

  return (
    <TagContext.Provider
      value={{
        tags,
        addTag: handleAddTag,
        updateTag: handleUpdateTag,
        deleteTag: handleDeleteTag,
      }}
    >
      {children}
    </TagContext.Provider>
  )
}
