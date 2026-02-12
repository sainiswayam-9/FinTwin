import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ScrollView, Text, Pressable, SafeAreaView } from "react-native";
import { colors } from "./theme";
import { useState } from "react";

// 🔴 IMPORTANT: imports now go through `forms/`
import FormsHub from "./forms/screens/FormsHub";
import OneTimePurchaseForm from "./forms/screens/OneTimePurchaseForm";
import EMIPurchaseForm from "./forms/screens/EMIPurchaseForm";
import IncomeChangeForm from "./forms/screens/IncomeChangeForm";
import RunwayCalculator from "./forms/screens/RunwayCalculator";
import Dashboard from "./forms/screens/Dashboard";
import Login from "./forms/screens/Login";
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./Screens/LoginScreen";
import SignupScreen from "./Screens/SignupScreen";
import Onboarding from "./Screens/Onboarding";

const Stack = createNativeStackNavigator();

export default function App() {
  const [activeForm, setActiveForm] = useState("DASHBOARD");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const renderForm = () => {
    switch (activeForm) {
      case "DASHBOARD":
        return <Dashboard />;
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
      case "FORMS":
        return <FormsHub />;
      default:
        return null;
    }
  };

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Login onLoginSuccess={() => setIsAuthenticated(true)} />
        </View>
        <StatusBar style="dark" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>FinTwin</Text>
            <Text style={styles.subtitle}>Financial runway planning</Text>
          </View>
          <Pressable
            onPress={() => {
              setIsAuthenticated(false);
              setActiveForm("DASHBOARD");
            }}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>FT</Text>
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={[styles.form, { paddingBottom: 120 }]} showsVerticalScrollIndicator={false}>
          {renderForm()}
        </ScrollView>

        <View style={styles.bottomBar}>
          {[{ key: "DASHBOARD", label: "Dashboard" }, { key: "FORMS", label: "Forms" }].map((item) => (
            <Pressable
              key={item.key}
              onPress={() => setActiveForm(item.key)}
              style={[styles.bottomTab, activeForm === item.key && styles.bottomTabActive]}
            >
              <Text style={[styles.bottomTabText, activeForm === item.key && styles.bottomTabTextActive]}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.light,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: colors.light,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.dark,
  },
  subtitle: {
    fontSize: 12,
    color: colors.slate,
    marginTop: 4,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: colors.light,
    fontWeight: "700",
  },
  menu: {
    paddingBottom: 8,
    gap: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: colors.light,
  },
  tabActive: {
    backgroundColor: colors.accent,
  },
  tabText: {
    color: colors.slate,
    fontWeight: "600",
    fontSize: 12,
  },
  tabTextActive: {
    color: colors.light,
  },
  form: {
    paddingVertical: 12,
    paddingBottom: 32,
  },
  bottomBar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 12,
    height: 64,
    backgroundColor: colors.light,
    borderRadius: 999,
    shadowColor: colors.dark,
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 10,
    zIndex: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 12,
  },
  bottomTab: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: "transparent",
  },
  bottomTabActive: {
    backgroundColor: colors.accent,
  },
  bottomTabText: {
    color: colors.slate,
    fontWeight: "700",
    fontSize: 14,
  },
  bottomTabTextActive: {
    color: colors.light,
  },
});
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

