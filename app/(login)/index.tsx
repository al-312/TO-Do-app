import PrimaryButton from "@/components/primaty-button";
import { theme } from "@/constants/theme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const LoginScreen = () => {
  const [email, setEmail] = useState("abc@gmai.com");
  const [password, setPassword] = useState("test@123");
  const router = useRouter();

  const handleLogin = () => {
    router.replace("/(tab)");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />

      <View style={styles.card}>
        <Text style={styles.header}>Welcome Back</Text>
        <Text style={styles.subheader}>Login to your account</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={theme.colors.textSecondary}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={theme.colors.textSecondary}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <PrimaryButton handlePress={handleLogin} text="Login" />
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    paddingHorizontal: theme.padding.large,
  },
  card: {
    backgroundColor: theme.colors.cardBackground,
    padding: theme.padding.large,
    borderRadius: theme.borderRadius.large,
    ...theme.shadow.android,
  },
  header: {
    fontSize: theme.fontSizes.header,
    color: theme.colors.textPrimary,
    marginBottom: theme.margin.small,
    fontWeight: "bold",
    textAlign: "center",
  },
  subheader: {
    fontSize: theme.fontSizes.secondary,
    color: theme.colors.textSecondary,
    marginBottom: theme.margin.large,
    textAlign: "center",
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: theme.borderRadius.small,
    padding: theme.padding.small,
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    marginBottom: theme.margin.medium,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
});
