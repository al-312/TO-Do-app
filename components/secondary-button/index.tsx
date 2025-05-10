import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { style } from "./style";

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
