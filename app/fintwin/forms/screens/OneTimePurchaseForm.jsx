import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../theme";
import { useState } from "react";
import FormInput from "../components/FormInput";
import PrimaryButton from "../components/PrimaryButton";

export default function OneTimePurchaseForm() {
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");

  const submit = () => {
    const payload = {
      type: "ONE_TIME",
      amount: Number(amount),
      month: Number(month),
    };
    console.log(payload);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>One-time Purchase</Text>
      <Text style={styles.subtitle}>Model a single large expense.</Text>
      <FormInput label="Purchase Amount" value={amount} onChange={setAmount} placeholder="e.g. 25000" />
      <FormInput label="Month (from now)" value={month} onChange={setMonth} placeholder="e.g. 2" />
      <PrimaryButton title="Add Purchase" onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.light,
    padding: 16,
    borderRadius: 16,
    shadowColor: colors.dark,
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.dark,
  },
  subtitle: {
    fontSize: 12,
    color: colors.slate,
    marginBottom: 8,
  },
});
