import { theme } from "@/constants/theme";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface FloatingActionButtonProps {
  handlePress: () => void;
}

function FloatingActionButton({ handlePress }: FloatingActionButtonProps) {
  return (
    <>
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={style.button}
          onPress={handlePress}
        >
          <FontAwesome6 name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
}

export default FloatingActionButton;

const style = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 20,
    right: 10,
    width: 50,
    height: 50,
    backgroundColor: theme.colors.accent,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100%",
  },
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.secondary,
    fontWeight: 600,
  },
});
