import { MD3Theme } from 'react-native-paper'
import { createThemedStyles } from '../../util/themedStyle'

export const navBarStyles = createThemedStyles((theme: MD3Theme) => ({
  outerContainer: {
    position: 'absolute',
    bottom: 16,
    width: '100%',
    alignItems: 'center',
    zIndex: 1,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    height: 60,
    borderRadius: 28,
    elevation: 2,
    shadowOpacity: 0.1,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    paddingInline: 16,
    paddingVertical: 4,

    justifyContent: 'space-around',
    alignItems: 'center',

    width: 320,
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
    paddingHorizontal: 4,
    position: 'relative',
  },
  tabLabel: {
    marginLeft: 4,
    fontSize: 12,
  },
  measureContainer: {
    flexDirection: 'row',
    position: 'absolute',
    opacity: 0,
    alignItems: 'center',
    pointerEvents: 'none',
  },
}))
