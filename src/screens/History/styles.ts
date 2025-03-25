import { StyleSheet } from 'react-native'
import { COLORS, FONTS } from '../../styles/theme'

export const createStyle = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: COLORS.BACKGROUND,
    },
    list: {
      marginTop: 20,
    },
    emptyListText: {
      color: COLORS.SECONDARY_TEXT,
      fontSize: FONTS.SIZE.LARGE,
      fontFamily: FONTS.REGULAR,
      textAlign: 'center',
      marginTop: 50,
    },
  })
