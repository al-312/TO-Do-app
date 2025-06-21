import { USER_ID } from "@/constants/variables";
import { getData } from "@/utils/storage-manager";
import { router, Stack } from "expo-router";

export default function Layout() {
  const userId = getData(USER_ID);
  if (!userId) router.replace("/");
  return (
    <>
      <Stack
        screenOptions={{
          contentStyle: {},
        }}
      >
        <Stack.Screen name="(login)/index" options={{ headerShown: false }} />
        <Stack.Screen name="(tab)" options={{ headerShown: false }} />
      </Stack>

      {/* <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer>
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: "Home",
              title: "overview",
            }}
          />
          <Drawer.Screen
            name="user/[id]"
            options={{
              drawerLabel: "User",
              title: "overview",
            }}
          />
        </Drawer>
      </GestureHandlerRootView> */}
    </>
  );
}
