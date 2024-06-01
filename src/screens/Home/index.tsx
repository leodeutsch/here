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

import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import { Guests } from '../../components/Guests'
import { ThemeContext } from '../../context/Theme'
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
        const savedGuests = await AsyncStorage.getItem('@guests')
        if (savedGuests) {
          setGuests(JSON.parse(savedGuests))
        }
      } catch (error) {
        console.error('Failed to load guests from storage', error)
      }
    }

    loadGuests()
  }, [])

  useEffect(() => {
    const saveGuests = async () => {
      try {
        await AsyncStorage.setItem('@guests', JSON.stringify(guests))
      } catch (error) {
        console.error('Failed to save guests to storage', error)
      }
    }

    saveGuests()
  }, [guests])

  const handleGuest = () => {
    if (guestName === '') {
      return Alert.alert('Sem nome', 'Por favor insira um nome.')
    }

    if (guests.length > 0) {
      if (guests.some((guest) => guest.name === guestName)) {
        return Alert.alert(
          'Convidado existe',
          'O convidado já foi adicionado na lista.',
        )
      }
    }

    const guest = {
      id: uuid.v4().toString(),
      name: guestName,
      enabled: true,
    }

    setGuests((prevState) => [...prevState, guest])
    setGuestName('')
  }

  const handleCheck = async (guest: GuestRes) => {
    setGuests((prevState) =>
      prevState.map((g) =>
        g.id === guest.id ? { ...g, enabled: !g.enabled } : g,
      ),
    )
  }

  const confirmDeleteGuest = (guest: GuestRes) => {
    setGuestToRemove(guest)
    setModalVisible(true)
  }

  const handleDeleteGuest = () => {
    if (guestToRemove) {
      setGuests((prevState) =>
        prevState.filter((guest) => guest.id !== guestToRemove.id),
      )
    }

    setModalVisible(false)
    setGuestToRemove(null)
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
