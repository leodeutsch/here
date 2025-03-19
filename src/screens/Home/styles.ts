import { StyleSheet } from 'react-native'
import { COLORS, FONTS } from '../../styles/theme'

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
    fontSize: 24,
    fontFamily: FONTS.REGULAR,
    fontWeight: 'bold',
  },
  addTaskButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: '100%',
    backgroundColor: COLORS.TEXT,
  },
  addTaskFont: {
    color: COLORS.BACKGROUND,
    fontSize: FONTS.SIZE.LARGE,
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
})
