import { theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.textSizes.header,
  },
});
