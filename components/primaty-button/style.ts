import { theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const primaryButtonStyle = StyleSheet.create({
  container: {
    width: "100%",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: theme.colors.accent,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.borderRadius,
  },
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.textSizes.secondary,
    fontWeight: 600,
  },
});
