import { MD3Theme } from 'react-native-paper'
import { createThemedStyles } from '../../util/themedStyle'

export const logStyles = createThemedStyles((theme: MD3Theme) => ({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
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
