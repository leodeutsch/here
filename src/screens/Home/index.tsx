import React, { useContext, useEffect, useState } from 'react'
import {
  Alert,
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { createStyle } from './styles'

import { Guests } from '../../components/Guests'
import { ThemeContext } from '../../context/Theme'
import { addGuest, deleteGuest, getGuests, updateGuest } from '../../service'
import { GuestRes } from '../../types/Guests'

export const Home = () => {
  const [guests, setGuests] = useState<GuestRes[]>([])
  const [guestName, setGuestName] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [guestToRemove, setGuestToRemove] = useState<GuestRes | null>(null)

  const { theme } = useContext(ThemeContext)
  const styles = createStyle(theme)

  useEffect(() => {
    const loadGuests = async () => {
      try {
        const savedGuests = await getGuests()
        if (savedGuests) {
          setGuests(savedGuests.data)
        }
      } catch (error: any) {
        console.error('Failed to load guests from api', error)
      }
    }

    loadGuests()
  }, [guests])

  const handleGuest = async () => {
    if (guestName === '') {
      return Alert.alert('Sem nome', 'Por favor insira um nome.')
    }

    if (guests.length > 0) {
      if (guests.some((g) => g?.name === guestName)) {
        return Alert.alert(
          'Convidado existe',
          'O convidado já foi adicionado na lista.',
        )
      }
    }

    try {
      const guest = {
        name: guestName,
        enabled: false,
      }

      const response = await addGuest(guest)
      console.warn(response)
      if (response && response.data && !response.data.error) {
        setGuests((prevState) => [...prevState, response.data])
      } else {
        throw new Error('Response does not contain expected data')
      }

      setGuestName('')
    } catch (error) {
      console.error('Error adding guest:', error)
      Alert.alert('Erro', 'Ocorreu um erro ao adicionar o convidado.')
    }
  }

  const handleCheck = async (guest: GuestRes) => {
    const updatedGuest = { ...guest, checked: !guest.enabled }

    try {
      await updateGuest(updatedGuest)

      setGuests((prevGuests) =>
        prevGuests.map((g) => (g.id === guest.id ? updatedGuest : g)),
      )
    } catch (error) {
      console.error('Error editing guest:', error)
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar o convidado.')
    }
  }

  const confirmDeleteGuest = (guest: GuestRes) => {
    setGuestToRemove(guest)
    setModalVisible(true)
  }

  const handleDeleteGuest = async () => {
    try {
      if (guestToRemove) {
        await deleteGuest(guestToRemove.id)

        setGuests((prevState) =>
          prevState.filter((guest) => guest.id !== guestToRemove.id),
        )
      }

      setModalVisible(false)
      setGuestToRemove(null)
    } catch (error) {
      console.error('Error removing guest:', error)
      Alert.alert('Erro', 'Ocorreu um erro ao remover o convidado.')
    }
  }

  const handleCancel = () => {
    setModalVisible(false)
    setGuestToRemove(null)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Casamento Mércia & Leo</Text>

      <Text style={styles.eventDate}>17 de Agosto de 2024</Text>

      <FlatList
        style={styles.list}
        data={guests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Guests
            guest={item}
            onCheck={() => handleCheck(item)}
            onRemove={() => confirmDeleteGuest(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>
            Adicione um convidado à lista.
          </Text>
        )}
      />

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do convidado"
          placeholderTextColor={theme === 'dark' ? '#333333' : '#959494'}
          onChangeText={setGuestName}
          value={guestName}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleGuest}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Tem certeza que quer remover o convidado {guestToRemove?.name}?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleCancel}
              >
                <Text style={styles.modalButtonText}>Não</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleDeleteGuest}
              >
                <Text style={styles.modalButtonText}>Sim</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}
