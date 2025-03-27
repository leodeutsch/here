import { Dimensions, StyleSheet } from 'react-native'
import { COLORS, FONTS } from '../../styles/theme'

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window')

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.BACKGROUND,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 48,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: FONTS.REGULAR,
    fontWeight: 'bold',
  },
  taskItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#999',
  },
  // New styles for bottom sheet
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(254, 254, 254, 0.5)',
    zIndex: 1,
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    marginBottom: -(SCREEN_HEIGHT * 0.1),
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
    maxHeight: SCREEN_HEIGHT * 0.85,
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
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 8, // Adjust this value to position the FAB above the CustomNavBar
    backgroundColor: COLORS.PRIMARY,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
})
