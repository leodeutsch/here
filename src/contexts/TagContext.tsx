import React, { createContext, useEffect, useState } from 'react'
import { addTag, getTags } from '../services/tagService'
import { Tag } from '../types'

interface TagContextType {
  tags: Tag[]
  addTag: (tag: Tag) => void
}

export const TagContext = createContext<TagContextType>({
  tags: [],
  addTag: () => {},
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

  const handleAddTag = async (tag: Tag) => {
    const newTags = await addTag(tag)
    setTags(newTags)
  }

  return (
    <TagContext.Provider value={{ tags, addTag: handleAddTag }}>
      {children}
    </TagContext.Provider>
  )
}
