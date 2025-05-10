import PrimaryButton from "@/components/primaty-button";
import { theme } from "@/constants/theme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StatusBar, Text, TextInput, View } from "react-native";
import { styles } from "./style";

const LoginScreen = () => {
  const [email, setEmail] = useState("abc@gmai.com");
  const [password, setPassword] = useState("test@123");
  const router = useRouter();

  const handleLogin = () => {
    router.replace("/home");
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
      <Text style={styles.header}>Login</Text>
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
  );
};

export default LoginScreen;
