import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { createStyle } from './styles'

export const History = () => {
  const [isLoading, setIsLoading] = useState(false)
  const styles = createStyle()

  useEffect(() => {}, [])

  return <View style={styles.container}></View>
}
