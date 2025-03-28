import { Dimensions, StyleSheet } from 'react-native'
import { COLORS } from '../../styles/theme'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

export const styles = StyleSheet.create({
  formContainer: {
    paddingBlock: 16,
    paddingInline: 6,
    height: 95,
    elevation: 16,
  },
  formTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    borderWidth: 0,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginBottom: 4,
    fontSize: 16,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(254, 254, 254, 0.1)',
    zIndex: 1,
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: SCREEN_HEIGHT * 0.8,
    backgroundColor: COLORS.BACKGROUND,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 24,
    zIndex: 2,
    elevation: 8,
    shadowColor: '#000',
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
    backgroundColor: '#DADADA',
    borderRadius: 2,
  },
})
