import { StyleSheet } from 'react-native'
import { COLORS } from '../../styles/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.BACKGROUND,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: COLORS.TEXT,
  },
  taskItem: {
    // backgroundColor: COLORS.CARD_BG,
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXT,
  },
  taskDate: {
    fontSize: 14,
    color: COLORS.INACTIVE,
    marginTop: 4,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.INACTIVE,
    textAlign: 'center',
  },
})
