import { StyleSheet } from 'react-native'
import { COLORS } from '../../styles/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.BACKGROUND,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: COLORS.PRIMARY,
  },
  addTagContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: COLORS.PRIMARY,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    justifyContent: 'center',
  },
  addButtonText: {
    color: COLORS.BACKGROUND,
    fontWeight: 'bold',
  },
  tagList: {
    flex: 1,
  },
  tagItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.INACTIVE,
  },
  tagName: {
    fontSize: 16,
    color: COLORS.TEXT,
  },
  tagActions: {
    flexDirection: 'row',
  },
  editButton: {
    color: COLORS.PRIMARY,
    marginRight: 16,
  },
  deleteButton: {
    color: 'red',
  },
  editInput: {
    flex: 1,
    height: 40,
    borderColor: COLORS.PRIMARY,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
})
