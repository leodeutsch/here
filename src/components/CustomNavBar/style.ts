import { StyleSheet } from 'react-native'
import { FONTS } from '../../styles/theme'

export const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 10,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    height: 60,
    borderRadius: 28,
    elevation: 8,
    shadowOpacity: 0.1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    paddingInline: 12,
    paddingVertical: 5,
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
    fontFamily: FONTS.REGULAR,
  },
  measureContainer: {
    flexDirection: 'row',
    position: 'absolute',
    opacity: 0,
    alignItems: 'center',
    pointerEvents: 'none',
  },
})
