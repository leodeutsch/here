import { Text, TouchableOpacity, View } from "react-native";
import { GuestProps } from "../../types/Guests";
import { styles } from "./styles";

export const Guests: React.FC<GuestProps> = ({
  name,
  onRemove,
  onCheck,
  checkedGuests,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.checkButton} onPress={onCheck}>
        <Text style={styles.checkButtonText}>
          {checkedGuests.includes(name) ? "X" : "✓"}
        </Text>
      </TouchableOpacity>

      <Text
        style={
          checkedGuests.includes(name)
            ? styles.checkedText
            : styles.uncheckedText
        }
      >
        {name}
      </Text>

      <TouchableOpacity style={styles.button} onPress={onRemove}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
    </View>
  );
};
