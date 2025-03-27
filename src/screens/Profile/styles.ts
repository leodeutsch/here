import { StyleSheet } from 'react-native'
import { COLORS, FONTS } from '../../styles/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
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
    backgroundColor: COLORS.CARD_BG,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 3,
    borderColor: COLORS.PRIMARY,
  },
  avatar: {
    height: 150,
    width: 150,
  },
  name: {
    fontSize: FONTS.SIZE.XLARGE,
    fontFamily: FONTS.BOLD,
    color: COLORS.TEXT,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: FONTS.SIZE.MEDIUM,
    fontFamily: FONTS.REGULAR,
    color: COLORS.SECONDARY_TEXT,
    marginBottom: 10,
  },
  card: {
    backgroundColor: COLORS.CARD_BG,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: FONTS.SIZE.LARGE,
    fontFamily: FONTS.BOLD,
    color: COLORS.PRIMARY,
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
    color: COLORS.TEXT,
  },
  logoutButton: {
    backgroundColor: COLORS.ERROR,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  logoutButtonText: {
    color: COLORS.BUTTON_TEXT,
    fontFamily: FONTS.BOLD,
    fontSize: FONTS.SIZE.MEDIUM,
  },
  infoText: {
    fontSize: FONTS.SIZE.MEDIUM,
    fontFamily: FONTS.REGULAR,
    color: COLORS.SECONDARY_TEXT,
    marginBottom: 8,
  },
})
