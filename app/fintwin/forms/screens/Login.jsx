import { useState } from "react";
import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import FormInput from "../components/FormInput";
import PrimaryButton from "../components/PrimaryButton";
import { colors } from "../../theme";

export default function Login({ onLoginSuccess, onSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Validation", "Please enter email and password.");
      return;
    }

    // Placeholder: replace with real auth call
    if (email.includes("@") && password.length >= 4) {
      Alert.alert("Signed in", `Welcome back, ${email.split("@")[0]}!`);
      if (typeof onLoginSuccess === "function") onLoginSuccess();
    } else {
      Alert.alert("Sign in failed", "Invalid credentials.");
    }
  };

  const handleSignUp = () => {
    if (typeof onSignUp === "function") {
      onSignUp();
      return;
    }
    Alert.alert("Sign up", "No sign-up handler provided.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>Sign in to continue to FinTwin</Text>

      <View style={styles.form}>
        <FormInput label="Email" value={email} onChange={setEmail} placeholder="you@example.com" keyboardType="email-address" />
        <FormInput label="Password" value={password} onChange={setPassword} placeholder="Your password" secureTextEntry={true} keyboardType="default" />

        <View style={styles.actions}>
          <PrimaryButton title="Sign In" onPress={handleSignIn} />
          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity onPress={handleSignUp} style={styles.signupButton}>
              <Text style={styles.signupLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 12 },
  title: { fontSize: 20, fontWeight: "800", color: colors.dark, marginBottom: 6 },
  subtitle: { color: colors.slate, marginBottom: 16 },
  form: { marginTop: 8 },
  actions: { marginTop: 12 },
  signupRow: { flexDirection: "row", alignItems: "center", marginTop: 12 },
  signupText: { color: colors.slate, marginRight: 8 },
  signupButton: {},
  signupLink: { color: colors.primary, fontWeight: "700" },
});
