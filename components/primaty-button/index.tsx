import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { primaryButtonStyle } from "./style";

interface PrimaryButtonProps {
  handlePress: () => void;
  text: string;
}

function PrimaryButton({ handlePress, text }: PrimaryButtonProps) {
  return (
    <>
      <View style={primaryButtonStyle.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={primaryButtonStyle.button}
          onPress={handlePress}
        >
          <Text style={primaryButtonStyle.text}>{text}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default PrimaryButton;
