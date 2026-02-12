import { View, Text, TextInput, StyleSheet } from "react-native";
import { colors } from "../../theme";

export default function FormInput({ label, value, onChange, placeholder, keyboardType = "numeric", secureTextEntry = false }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        placeholderTextColor={colors.slate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 14 },
  label: {
    fontWeight: "600",
    marginBottom: 6,
    color: colors.dark,
    fontSize: 13,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.slate,
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.light,
    color: colors.dark,
  },
});
