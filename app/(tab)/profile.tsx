import PrimaryButton from "@/components/primaty-button";
import { theme } from "@/constants/theme";
import { USER_ID } from "@/constants/variables";
import { removeData } from "@/utils/storage-manager";
import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

export default function ProfileTab() {
  const handleLogout = () => {
    removeData(USER_ID);
    router.replace("/(login)");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: "https://i.pravatar.cc/100?img=13" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>John Smith</Text>
        <Text style={styles.email}>johnsmith@example.com</Text>
        <PrimaryButton handlePress={handleLogout} text="Logout" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f4f7",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 340,
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: theme.colors.accent,
  },
  name: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 24,
  },
});
