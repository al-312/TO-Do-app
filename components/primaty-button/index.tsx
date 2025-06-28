import { theme } from "@/constants/theme";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface PrimaryButtonProps {
  handlePress: () => void;
  text: string;
  disabled?: boolean;
  loading?: boolean;
}

function PrimaryButton({
  handlePress,
  text,
  disabled = false,
  loading = false,
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <View style={primaryButtonStyle.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          primaryButtonStyle.button,
          isDisabled && primaryButtonStyle.disabledButton,
        ]}
        onPress={handlePress}
        disabled={isDisabled}
      >
        {loading ? (
          <ActivityIndicator size="small" color={theme.colors.textPrimary} />
        ) : (
          <Text style={primaryButtonStyle.text}>{text}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

export default PrimaryButton;

const primaryButtonStyle = StyleSheet.create({
  container: {
    width: "100%",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: theme.colors.accent,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.borderRadius.large,
  },
  disabledButton: {
    backgroundColor: theme.colors.accent + "88",
  },
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.secondary,
    fontWeight: "600",
  },
});
