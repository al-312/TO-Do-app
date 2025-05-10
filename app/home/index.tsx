import SecondaryButton from "@/components/secondary-button";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

function Home() {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <SecondaryButton handlePress={() => console.log("hi")} text="text" />
      </SafeAreaView>
    </>
  );
}

export default Home;
