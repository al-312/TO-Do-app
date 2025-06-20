import PrimaryButton from "@/components/primaty-button";
import { theme } from "@/constants/theme";
import { router } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

function Home() {
  return (
    <SafeAreaView style={style.mainContainer}>
      <View style={style.container}>
        <Text style={style.title}>Tasks</Text>
        <PrimaryButton
          handlePress={() => {
            router.push("/settings");
          }}
          text="Back"
        />
      </View>
    </SafeAreaView>
  );
}

export default Home;

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.colors.primary,
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
