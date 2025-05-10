import { theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    width: "100%",
  },
  button: {
    width: "100%",
    height: 50,
    borderWidth: 2,
    borderColor: theme.colors.accent,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.borderRadius,
  },
  text: {
    color: theme.colors.accent,
    fontSize: theme.textSizes.secondary,
    fontWeight: 600,
  },
});
