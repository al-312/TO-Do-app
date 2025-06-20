import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function Layout() {
  return (
    <>
      {/* <Stack
        screenOptions={{
          contentStyle: {},
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login/index" options={{ headerShown: false }} />
      </Stack> */}

      <GestureHandlerRootView style={{ flex: 1 }}>
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
      </GestureHandlerRootView>
    </>
  );
}
