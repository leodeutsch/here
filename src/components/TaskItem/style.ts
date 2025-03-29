import { MD3Theme } from 'react-native-paper'
import { createThemedStyles } from '../../util/themedStyle'

export const taskItemStyles = createThemedStyles((theme: MD3Theme) => ({
  container: {
    width: '100%', // Span the full screen width
    // height: '10%',
    minHeight: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
    elevation: 6,
    borderRadius: 16,
    marginBottom: 6,
    paddingBlock: 4,
    paddingLeft: 12,
    paddingRight: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: '500', // Medium weight per MD3
    color: theme.colors.onSurface,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  tag: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
    marginBottom: 4,
    height: 32, // Small pill size
    paddingHorizontal: 8,
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    textAlignVertical: 'center', // For Android
    color: theme.colors.onSurfaceVariant,
  },
  reminderText: {
    fontSize: 12,
    color: theme.colors.outline, // Grey text per MD3 for secondary info
    alignSelf: 'center',
  },
  rightContent: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: theme.colors.outline,
  },

  completedDescription: {
    textDecorationLine: 'line-through',
    color: theme.colors.outline,
  },
}))
