import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { createStyle } from "./styles";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Guests } from "../../components/Guests";
import { ThemeContext } from "../../context/Theme";

export const Home = () => {
  const [guests, setGuests] = useState<string[]>([]);
  const [checkedGuests, setCheckedGuests] = useState<string[]>([]);
  const [guestName, setGuestName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [guestToRemove, setGuestToRemove] = useState<string | null>(null);

  const { theme } = useContext(ThemeContext);
  const styles = createStyle(theme);

  useEffect(() => {
    const loadGuests = async () => {
      try {
        const savedGuests = await AsyncStorage.getItem("@guests");
        const savedCheckedGuests = await AsyncStorage.getItem("@checkedGuests");
        if (savedGuests) {
          setGuests(JSON.parse(savedGuests));
        }
        if (savedCheckedGuests) {
          setCheckedGuests(JSON.parse(savedCheckedGuests));
        }
      } catch (error) {
        console.error("Failed to load guests from storage", error);
      }
    };

    loadGuests();
  }, []);

  useEffect(() => {
    const saveGuests = async () => {
      try {
        await AsyncStorage.setItem("@guests", JSON.stringify(guests));
        await AsyncStorage.setItem(
          "@checkedGuests",
          JSON.stringify(checkedGuests)
        );
      } catch (error) {
        console.error("Failed to save guests to storage", error);
      }
    };

    saveGuests();
  }, [guests, checkedGuests]);

  const handleGuest = () => {
    if (guestName === "") {
      return Alert.alert("Sem nome", "Por favor insira um nome.");
    }

    if (guests.includes(guestName)) {
      return Alert.alert(
        "Convidado existe",
        "O convidado já foi adicionado na lista."
      );
    }

    setGuests((prevState) => [...prevState, guestName]);
    setGuestName("");
  };

  const handleCheck = (name: string) => {
    if (checkedGuests.includes(name)) {
      setCheckedGuests((prevState) =>
        prevState.filter((guest) => guest !== name)
      );
    } else {
      setCheckedGuests((prevState) => [...prevState, name]);
    }
  };

  const confirmDeleteGuest = (name: string) => {
    setGuestToRemove(name);
    setModalVisible(true);
  };

  const handleDeleteGuest = () => {
    if (guestToRemove) {
      setGuests((prevState) =>
        prevState.filter((guest) => guest !== guestToRemove)
      );
      setCheckedGuests((prevState) =>
        prevState.filter((guest) => guest !== guestToRemove)
      );
    }
    setModalVisible(false);
    setGuestToRemove(null);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setGuestToRemove(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Casamento Mércia & Leo</Text>

      <Text style={styles.eventDate}>17 de Agosto de 2024</Text>

      <FlatList
        style={styles.list}
        data={guests}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Guests
            name={item}
            checkedGuests={checkedGuests}
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
          placeholderTextColor={theme === "dark" ? "#333333" : "#959494"}
          onChangeText={setGuestName}
          value={guestName}
        />

        <TouchableOpacity style={styles.button} onPress={handleGuest}>
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
              Tem certeza que quer remover o convidado {guestToRemove}?
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
  );
};
