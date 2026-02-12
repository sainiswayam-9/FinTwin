import { useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import OneTimePurchaseForm from "./OneTimePurchaseForm";
import EMIPurchaseForm from "./EMIPurchaseForm";
import IncomeChangeForm from "./IncomeChangeForm";
import RunwayCalculator from "./RunwayCalculator";
import { colors } from "../../theme";

const tabs = [
  { key: "ONE_TIME", label: "One-time", icon: "card-outline" },
  { key: "EMI", label: "EMI", icon: "repeat-outline" },
  { key: "INCOME_UP", label: "Income +", icon: "trending-up-outline" },
  { key: "INCOME_DOWN", label: "Income -", icon: "trending-down-outline" },
  { key: "RUNWAY", label: "Runway", icon: "time-outline" },
];

export default function FormsHub() {
  const [active, setActive] = useState("ONE_TIME");

  const renderActive = () => {
    switch (active) {
      case "ONE_TIME":
        return <OneTimePurchaseForm />;
      case "EMI":
        return <EMIPurchaseForm />;
      case "INCOME_UP":
        return <IncomeChangeForm type="INCREASE" />;
      case "INCOME_DOWN":
        return <IncomeChangeForm type="DECREASE" />;
      case "RUNWAY":
        return <RunwayCalculator />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Forms</Text>
        <Text style={styles.hint}>Manage expenses and income scenarios</Text>
      </View>

      <View style={styles.topNav} pointerEvents="box-none">
        {tabs.map((t) => (
          <Pressable
            key={t.key}
            onPress={() => setActive(t.key)}
            style={[styles.tab, active === t.key && styles.tabActive]}
          >
            <View style={styles.tabContent}>
              <Ionicons
                name={t.icon}
                size={18}
                color={active === t.key ? colors.light : colors.slate}
              />
              <Text style={[styles.tabText, active === t.key && styles.tabTextActive]}>{t.label}</Text>
            </View>
          </Pressable>
        ))}
      </View>

      <View style={styles.main}>
        <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
          {renderActive()}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 8, paddingBottom: 8 },
  header: { paddingHorizontal: 4, paddingVertical: 6 },
  title: { fontSize: 16, fontWeight: "800", color: colors.dark },
  hint: { fontSize: 12, color: colors.slate, marginTop: 2 },
  main: { flex: 1 },
  body: { paddingVertical: 12, paddingBottom: 24, paddingHorizontal: 2 },
  topNav: {
    height: 64,
    marginHorizontal: 8,
    marginTop: 8,
    backgroundColor: colors.light,
    borderRadius: 999,
    shadowColor: colors.dark,
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 12,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "transparent",
  },
  tabActive: {
    backgroundColor: colors.accent,
  },
  tabText: {
    fontSize: 12,
    color: colors.slate,
    fontWeight: "600",
  },
  tabTextActive: {
    color: colors.light,
  },
  tabContent: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
});
