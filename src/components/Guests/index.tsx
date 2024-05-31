import { useContext } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { ThemeContext } from '../../context/Theme'
import { GuestProps } from '../../types/Guests'
import { createStyle } from './styles'

export const Guests: React.FC<GuestProps> = ({ guest, onRemove, onCheck }) => {
  const { theme } = useContext(ThemeContext)
  const styles = createStyle(theme)

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkButton}
        onPress={onCheck}
      >
        <Text style={styles.checkButtonText}>{guest.enabled ? 'X' : '✓'}</Text>
      </TouchableOpacity>

      <Text style={guest.enabled ? styles.checkedText : styles.uncheckedText}>
        {guest.name}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={onRemove}
      >
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
    </View>
  )
}
