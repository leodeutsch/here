import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";

import { Guests } from "../../components/Guests";

export const Home = () => {
  const [guests, setGuests] = useState<string[]>([]);
  const [guestName, setGuestName] = useState("");
  const [active, setActive] = useState(false);

  const buttonTextStyle = {
    color: active ? "green" : "red",
  };

  const handleGuest = () => {
    if (guestName === "") {
      return Alert.alert("No name", "Please enter a guest name.");
    }

    if (guests.includes(guestName)) {
      return Alert.alert(
        "Guest is on the list",
        "The guest was already added."
      );
    }

    setGuests((prevState) => [...prevState, guestName]);
    setGuestName("");
  };

  const handleCheck = () => setActive(!active);

  const handleDeleteGuest = (name: string) => {
    Alert.alert(
      "Remove",
      `Are you sure you want to delete the guest ${name}?`,
      [
        {
          text: "Yes",
          onPress: () =>
            setGuests((prevState) =>
              prevState.filter((guest) => guest !== name)
            ),
        },
        {
          text: "No",
          style: "cancel",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>M&L Wedding</Text>

      <Text style={styles.eventDate}>August 17th 2024</Text>

      <FlatList
        style={styles.list}
        data={guests}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Guests
            key={item}
            name={item}
            active={active}
            onCheck={() => handleCheck()}
            onRemove={() => handleDeleteGuest(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>Add some guest to the list.</Text>
        )}
      />

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Guest name"
          placeholderTextColor="#959494"
          onChangeText={setGuestName}
          value={guestName}
        />

        <TouchableOpacity style={styles.button} onPress={handleGuest}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
