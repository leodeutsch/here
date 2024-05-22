import { Text, TouchableOpacity, View } from "react-native";
import { props } from "../../types/Guests";
import { styles } from "./styles";

export const Guests = ({ name, onRemove, onCheck, active }: props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.checkButton} onPress={onCheck}>
        <Text style={styles.checkButtonText}>{active ? "X" : "✓"}</Text>
      </TouchableOpacity>

      <Text style={active ? styles.checkedText : styles.uncheckedText}>
        {name}
      </Text>

      <TouchableOpacity style={styles.button} onPress={onRemove}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
    </View>
  );
};
