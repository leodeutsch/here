import { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

export const ChipComponent: FC<{ label: string }> = ({ label }) => (
  <View style={styles.customTag}>
    <Text style={styles.customTagText}>{label}</Text>
  </View>
)

const styles = StyleSheet.create({
  customTag: {
    height: 24, // Fully customizable height
    backgroundColor: '#ababab63',
    borderRadius: 12, // Pill shape
    paddingVertical: 2, // Exact padding you want
    paddingHorizontal: 8, // Exact padding you want
    alignItems: 'center',
    justifyContent: 'center',
  },
  customTagText: {
    fontSize: 11, // Exact text size
    color: '#000',
  },
})
