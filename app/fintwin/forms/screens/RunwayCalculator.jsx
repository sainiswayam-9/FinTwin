import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../theme";
import { useState } from "react";
import FormInput from "../components/FormInput";
import PrimaryButton from "../components/PrimaryButton";

export default function RunwayCalculator() {
  const [savings, setSavings] = useState("");
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [runway, setRunway] = useState(null);

  const calculate = () => {
    const netBurn = Number(income) - Number(expenses);
    const months = netBurn >= 0 ? Infinity : Math.floor(Number(savings) / Math.abs(netBurn));
    setRunway(months);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Runway Calculator</Text>
      <Text style={styles.subtitle}>Estimate how long your cash lasts.</Text>
      <FormInput label="Current Savings" value={savings} onChange={setSavings} placeholder="e.g. 120000" />
      <FormInput label="Monthly Income" value={income} onChange={setIncome} placeholder="e.g. 50000" />
      <FormInput label="Monthly Expenses" value={expenses} onChange={setExpenses} placeholder="e.g. 58000" />
      <PrimaryButton title="Calculate Runway" onPress={calculate} />
      {runway !== null && (
        <View style={styles.result}>
          <Text style={styles.resultLabel}>Runway</Text>
          <Text style={styles.resultValue}>
            {runway === Infinity ? "Stable" : `${runway} months`}
          </Text>
          <Text style={styles.resultHint}>
            {runway === Infinity ? "You are cashflow positive." : "Based on current burn."}
          </Text>
        </View>
      )}
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
  result: {
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.light,
    borderWidth: 1,
    borderColor: colors.slate,
  },
  resultLabel: {
    fontSize: 12,
    color: colors.slate,
  },
  resultValue: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.dark,
    marginTop: 4,
  },
  resultHint: {
    fontSize: 12,
    color: colors.slate,
    marginTop: 4,
  },
});
