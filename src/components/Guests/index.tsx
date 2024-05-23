import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../../context/Theme";
import { GuestProps } from "../../types/Guests";
import { createStyle } from "./styles";

export const Guests: React.FC<GuestProps> = ({
  name,
  onRemove,
  onCheck,
  checkedGuests,
}) => {
  const { theme } = useContext(ThemeContext);
  const styles = createStyle(theme);

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
