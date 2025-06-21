import { theme } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SecondaryButtonProps {
  handlePress: () => void;
  text: string;
}

function SecondaryButton({ handlePress, text }: SecondaryButtonProps) {
  return (
    <>
      <View style={style.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={style.button}
          onPress={handlePress}
        >
          <Text style={style.text}>{text}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default SecondaryButton;

const style = StyleSheet.create({
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
    borderRadius: theme.borderRadius.large,
  },
  text: {
    color: theme.colors.accent,
    fontSize: theme.fontSizes.secondary,
    fontWeight: 600,
  },
});
