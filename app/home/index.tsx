import PrimaryButton from "@/components/primaty-button";
import { router } from "expo-router";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { style } from "./style";

function Home() {
  return (
    <SafeAreaView style={style.mainContainer}>
      <View style={style.container}>
        <Text style={style.title}>Tasks</Text>
        <PrimaryButton
          handlePress={() => {
            router.push("/login");
          }}
          text="Back"
        />
      </View>
    </SafeAreaView>
  );
}

export default Home;
