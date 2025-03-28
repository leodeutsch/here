import React, { createContext, useState } from 'react'

type BottomSheetContent = 'addTask' | 'calendar' | null

interface BottomSheetContextType {
  isVisible: boolean
  content: BottomSheetContent
  showBottomSheet: (content: BottomSheetContent) => void
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

  const showBottomSheet = (newContent: BottomSheetContent) => {
    setContent(newContent)
    setIsVisible(true)
  }

  const hideBottomSheet = () => {
    if (content === 'calendar') {
      setContent('addTask')
    } else {
      setIsVisible(false)
      setContent(null)
    }
  }

  return (
    <BottomSheetContext.Provider
      value={{ isVisible, content, showBottomSheet, hideBottomSheet }}
    >
      {children}
    </BottomSheetContext.Provider>
  )
}
