import { MD3Theme } from 'react-native-paper'
import { FONTS } from '../../styles/theme'
import { createThemedStyles } from '../../util/themedStyle'

export const profileStyles = createThemedStyles((theme: MD3Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatarContainer: {
    borderRadius: 75,
    overflow: 'hidden',
    height: 80,
    width: 80,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 3,
    borderColor: theme.colors.primary,
  },
  avatar: {
    height: 150,
    width: 150,
  },
  name: {
    fontSize: FONTS.SIZE.XLARGE,
    fontFamily: FONTS.BOLD,
    color: theme.colors.onBackground,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: FONTS.SIZE.MEDIUM,
    fontFamily: FONTS.REGULAR,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 10,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  resetButton: {
    padding: 5,
  },
  sectionTitle: {
    fontSize: FONTS.SIZE.LARGE,
    fontFamily: FONTS.BOLD,
    color: theme.colors.primary,
    marginBottom: 15,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingText: {
    fontSize: FONTS.SIZE.MEDIUM,
    fontFamily: FONTS.REGULAR,
    color: theme.colors.onBackground,
  },
  logoutButton: {
    backgroundColor: theme.colors.error,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  logoutButtonText: {
    color: theme.colors.onError,
    fontFamily: FONTS.BOLD,
    fontSize: FONTS.SIZE.MEDIUM,
  },
  infoText: {
    fontSize: FONTS.SIZE.MEDIUM,
    fontFamily: FONTS.REGULAR,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 8,
  },
}))
