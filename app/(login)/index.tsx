import PrimaryButton from "@/components/primaty-button";
import { auth } from "@/config/firebase";
import { theme } from "@/constants/theme";
import { USER_ID } from "@/constants/variables";
import { storeData } from "@/utils/storage-manager";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
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
  const [email, setEmail] = useState<string>("test@mail.com");
  const [password, setPassword] = useState<string>("test@123");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = () => {
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        storeData(USER_ID, user.uid);

        router.replace("/(tab)");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error(errorCode, errorMessage);
      });
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

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={theme.colors.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color={theme.colors.textSecondary}
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>

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
  passwordContainer: {
    position: "relative",
    justifyContent: "center",
  },

  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
});
