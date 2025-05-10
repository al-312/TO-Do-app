import { theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    padding: theme.padding.large,
    justifyContent: "center",
  },
  header: {
    fontSize: theme.textSizes.header,
    color: theme.colors.textPrimary,
    fontWeight: "semibold",
    marginBottom: theme.padding.large,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#4A5A7C",
    borderRadius: theme.borderRadius,
    padding: theme.padding.medium,
    color: theme.colors.textPrimary,
    fontSize: theme.textSizes.title,
    marginBottom: theme.padding.medium,
    ...theme.shadow,
  },
  loginButton: {
    backgroundColor: theme.colors.accent,
    borderRadius: theme.borderRadius,
    padding: theme.padding.medium,
    alignItems: "center",
    marginBottom: theme.padding.small,
    ...theme.shadow,
  },
  cancelButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius,
    padding: theme.padding.medium,
    alignItems: "center",
    ...theme.shadow,
  },
  buttonText: {
    color: theme.colors.primary,
    fontSize: theme.textSizes.secondary,
    fontWeight: "semibold",
  },
  errorText: {
    fontSize: theme.textSizes.secondary,
    color: "#FF6B6B", // Red for errors
    marginBottom: theme.padding.medium,
    textAlign: "center",
  },
});
