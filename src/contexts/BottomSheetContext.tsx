import React, { createContext, useCallback, useState } from 'react'
import { Tag } from '../types'

type BottomSheetContent =
  | 'addTask'
  | 'calendar'
  | 'tag'
  | 'tagSuggestions'
  | null

interface BottomSheetData {
  tag?: Tag
}

interface BottomSheetContextType {
  isVisible: boolean
  content: BottomSheetContent
  data: BottomSheetData | null
  showBottomSheet: (content: BottomSheetContent, data?: BottomSheetData) => void
  hideBottomSheet: () => void
}

export const BottomSheetContext = createContext<
  BottomSheetContextType | undefined
>(undefined)

export const BottomSheetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [content, setContent] = useState<BottomSheetContent>(null)
  const [data, setData] = useState<BottomSheetData | null>(null)

  const showBottomSheet = useCallback(
    (newContent: BottomSheetContent, newData?: BottomSheetData) => {
      setContent(newContent)
      setData(newData || null)
      setIsVisible(true)
    },
    [],
  )

  const hideBottomSheet = () => {
    if (content === 'calendar' || content === 'tagSuggestions') {
      setContent('addTask')
    } else {
      setIsVisible(false)
      setContent(null)
      setData(null)
    }
  }

  return (
    <BottomSheetContext.Provider
      value={{ isVisible, content, data, showBottomSheet, hideBottomSheet }}
    >
      {children}
    </BottomSheetContext.Provider>
  )
}
