import { StyleSheet } from 'react-native'

export const createStyle = (theme: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: theme === 'dark' ? '#000' : '#fff',
    },
    eventName: {
      color: theme === 'dark' ? '#59B1A6' : '#35716a',
      fontSize: 35,
      fontWeight: 'bold',
      marginTop: 48,
    },
    eventDate: {
      color: '#6b6b6b',
      fontSize: 16,
    },
    input: {
      flex: 1,
      height: 56,
      backgroundColor: theme === 'dark' ? '#7a7a7a' : '#6b6b6b',
      borderRadius: 50,
      color: '#FFF',
      padding: 16,
      fontSize: 16,
      marginRight: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 3,
        height: 3,
      },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 3,
    },
    button: {
      width: 56,
      height: 56,
      borderRadius: 50,
      backgroundColor: theme === 'dark' ? '#48998F' : '#35716a',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 3,
        height: 3,
      },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 3,
    },
    buttonText: {
      color: '#FFF',
      fontSize: 25,
    },
    form: {
      width: '100%',
      flexDirection: 'row',
      marginTop: 40,
      marginBottom: 15,
    },
    list: {
      marginTop: 50,
    },
    emptyListText: {
      color: '#6b6b6b',
      fontSize: 20,
      textAlign: 'center',
      marginTop: 50,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      width: 300,
      padding: 20,
      backgroundColor: theme === 'dark' ? '#333' : 'white',
      borderRadius: 10,
      alignItems: 'center',
    },
    modalText: {
      fontSize: 18,
      textAlign: 'center',
      marginBottom: 20,
      color: theme === 'dark' ? 'white' : 'black',
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    modalButton: {
      flex: 1,
      alignItems: 'center',
      padding: 10,
    },
    modalButtonText: {
      fontSize: 16,
      color: theme === 'dark' ? '#59B1A6' : '#35716a',
    },
  })
