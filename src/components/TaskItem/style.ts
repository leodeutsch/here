import { StyleSheet } from 'react-native'
import { COLORS } from '../../styles/theme'

export const styles = StyleSheet.create({
  container: {
    width: '100%', // Span the full screen width
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BACKGROUND,
    elevation: 6,
    borderRadius: 16,
    marginBottom: 6,
    paddingBlock: 4,
    paddingLeft: 12,
    paddingRight: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: '500', // Medium weight per MD3
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  tag: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
    marginBottom: 4,
    height: 32, // Small pill size
    paddingHorizontal: 8,
    backgroundColor: '#ababab63',
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    textAlignVertical: 'center', // For Android
  },
  reminderText: {
    fontSize: 12,
    color: '#757575', // Grey text per MD3 for secondary info
    alignSelf: 'center',
  },
  rightContent: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: COLORS.INACTIVE,
  },

  completedDescription: {
    textDecorationLine: 'line-through',
    color: COLORS.INACTIVE,
  },
})
