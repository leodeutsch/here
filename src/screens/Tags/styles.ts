import { MD3Theme } from 'react-native-paper'
import { createThemedStyles } from '../../util/themedStyle'

export const tagStyles = createThemedStyles((theme: MD3Theme) => ({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: theme.colors.primary,
  },
  addTagContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    justifyContent: 'center',
  },
  addButtonText: {
    color: theme.colors.background,
    fontWeight: 'bold',
  },
  tagList: {
    flex: 1,
  },
  tagItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline,
  },
  tagName: {
    fontSize: 16,
    color: theme.colors.onBackground,
  },
  tagActions: {
    flexDirection: 'row',
  },
  editButton: {
    color: theme.colors.primary,
    marginRight: 16,
  },
  deleteButton: {
    color: 'red',
  },
  editInput: {
    flex: 1,
    height: 40,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
}))
