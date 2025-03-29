import { FC, useMemo } from 'react'
import { View } from 'react-native'
import { MD3Theme, Text } from 'react-native-paper'
import { useTheme } from '../../hooks/useTheme'
import { createThemedStyles } from '../../util/themedStyle'

export const ChipComponent: FC<{ label: string }> = ({ label }) => {
  const { theme } = useTheme()
  const styles = useMemo(() => chipStyle(theme), [theme])
  return (
    <View style={styles.customTag}>
      <Text style={styles.customTagText}>{label}</Text>
    </View>
  )
}

const chipStyle = createThemedStyles((theme: MD3Theme) => ({
  customTag: {
    height: 24, // Fully customizable height
    backgroundColor: theme.colors.backdrop,
    borderRadius: 12, // Pill shape
    paddingVertical: 2, // Exact padding you want
    paddingHorizontal: 8, // Exact padding you want
    alignItems: 'center',
    justifyContent: 'center',
  },
  customTagText: {
    fontSize: 11, // Exact text size
    color: theme.colors.onBackground,
  },
}))
