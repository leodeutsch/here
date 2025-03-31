import { Dimensions } from 'react-native'
import { MD3Theme } from 'react-native-paper'
import { FONTS } from '../../styles/theme'
import { createThemedStyles } from '../../util/themedStyle'

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window')

export const calendarSheetStyles = createThemedStyles((theme: MD3Theme) => ({
  container: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: SCREEN_HEIGHT * 0.7,
    paddingHorizontal: 8,
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
    backgroundColor: theme.colors.surface,
    color: theme.colors.onSurface,
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
    color: theme.colors.onSurface,
  },
  timePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceVariant,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  timePickerButtonText: {
    fontSize: 16,
    fontFamily: FONTS.REGULAR,
    color: theme.colors.onSurface,
    marginRight: 8,
  },
}))

// In styles.ts
export const calendarTheme = (theme: MD3Theme) => ({
  calendarBackground: theme.colors.surface,
  textSectionTitleColor: theme.colors.primary,
  selectedDayTextColor: theme.colors.onPrimary,
  todayTextColor: theme.colors.primary,
  dayTextColor: theme.colors.onSurface,
  textDisabledColor: theme.colors.surface,
  selectedDayBackgroundColor: theme.colors.primary,
  arrowColor: theme.colors.primary,
  monthTextColor: theme.colors.primary,
  indicatorColor: theme.colors.primary,
  textDayFontFamily: theme.fonts.bodyMedium.fontFamily,
  textMonthFontFamily: theme.fonts.bodyLarge.fontFamily,
  textDayHeaderFontFamily: theme.fonts.bodyMedium.fontFamily,
  textDayFontSize: 16,
  textMonthFontSize: 18,
  textDayHeaderFontSize: 14,
})
