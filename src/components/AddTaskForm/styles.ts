import { Dimensions } from 'react-native'
import { MD3Theme } from 'react-native-paper'
import { createThemedStyles } from '../../util/themedStyle'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

export const addTaskFormStyles = createThemedStyles((theme: MD3Theme) => ({
  formContainer: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: theme.colors.surface,
    minHeight: 104,
  },
  input: {
    width: '100%',
    borderWidth: 0,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 16,
    fontSize: 16,
    color: theme.colors.onSurface,
    backgroundColor: theme.colors.surface,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 24,
  },
  bottomContainerLeftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    marginRight: 8,
  },
  bottomContentText: {
    marginLeft: 4,
    fontSize: 14,
    color: theme.colors.onSurface,
  },
  expandedView: {
    overflow: 'hidden',
    marginBottom: 16,
  },
  descriptionInput: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: theme.colors.onSurface,
    textAlignVertical: 'top',
  },
}))
