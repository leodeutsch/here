import { Dimensions } from 'react-native'
import { MD3Theme } from 'react-native-paper'
import { FONTS } from '../../styles/theme'
import { createThemedStyles } from '../../util/themedStyle'

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window')

export const homeStyles = createThemedStyles((theme: MD3Theme) => ({
  container: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: theme.colors.background,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 48,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: FONTS.REGULAR,
    fontWeight: 'bold',
    color: theme.colors.onBackground,
  },
  list: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  taskItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 20,
    color: theme.colors.outline,
  },
  // New styles for bottom sheet
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.backdrop,
    zIndex: 1,
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    // height: 100,
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 2,
    elevation: 8,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  bottomSheetHandle: {
    alignItems: 'center',
    paddingTop: 12,
  },
  bottomSheetIndicator: {
    width: 40,
    height: 4,
    backgroundColor: theme.colors.outlineVariant,
    borderRadius: 2,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 80,
    backgroundColor: theme.colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    zIndex: 1, // Ensure it stays above other content
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
}))
