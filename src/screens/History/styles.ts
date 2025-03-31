import { MD3Theme } from 'react-native-paper'
import { FONTS } from '../../styles/theme'
import { createThemedStyles } from '../../util/themedStyle'

export const logStyles = createThemedStyles((theme: MD3Theme) => ({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 48,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: FONTS.REGULAR,
    fontWeight: 'bold',
    color: theme.colors.onBackground,
  },
  taskItem: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.onBackground,
  },
  taskDate: {
    fontSize: 14,
    color: theme.colors.outlineVariant,
    marginTop: 4,
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.outlineVariant,
    textAlign: 'center',
  },
}))
