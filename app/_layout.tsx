import { theme } from "@/constants/theme";
import { Stack } from "expo-router";
import "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.primary,
        },
      }}
    >
      <Stack.Screen name="home/index" />
      <Stack.Screen name="add-task" />
    </Stack>
  );
}
