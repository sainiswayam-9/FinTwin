import { Pressable, Text, StyleSheet } from "react-native";
import { colors } from "../../theme";

export default function PrimaryButton({ title, onPress, variant = "primary" }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: colors.accent,
  },
  primaryText: {
    color: colors.light,
    fontWeight: "700",
  },
  outline: {
    borderWidth: 1,
    borderColor: colors.slate,
    backgroundColor: colors.light,
  },
  outlineText: {
    color: colors.dark,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.85,
  },
  text: {
    fontSize: 14,
    letterSpacing: 0.2,
  },
});
