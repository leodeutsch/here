import { Dimensions, StyleSheet } from 'react-native'
import { COLORS, FONTS } from '../../styles/theme'

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window')

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: SCREEN_HEIGHT * 0.7,
    paddingHorizontal: 8,
    // paddingBottom: 20,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerButton: {
    padding: 8,
  },
  calendar: {
    marginBottom: 16,
  },
  timePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  timePickerLabel: {
    fontSize: 16,
    fontFamily: FONTS.REGULAR,
    color: COLORS.TEXT,
  },
  timePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.CARD_BG,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  timePickerButtonText: {
    fontSize: 16,
    fontFamily: FONTS.REGULAR,
    color: COLORS.TEXT,
    marginRight: 8,
  },
})
