import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");

type SnackbarProps = {
  message: string;
  duration?: number; // milliseconds, default 3000
  onDismiss?: () => void;
  visible: boolean;
};

const Snackbar: React.FC<SnackbarProps> = ({
  message,
  duration = 3000,
  visible,
  onDismiss,
}) => {
  const [bottom] = useState(new Animated.Value(-80));
  useEffect(() => {
    if (visible) {
      Animated.timing(bottom, {
        toValue: 30,
        duration: 300,
        useNativeDriver: false,
      }).start();

      const timeout = setTimeout(() => {
        hideSnackbar();
      }, duration);

      return () => clearTimeout(timeout);
    } else {
      hideSnackbar();
    }
  }, [visible]);

  const hideSnackbar = () => {
    Animated.timing(bottom, {
      toValue: -80,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      onDismiss && onDismiss();
    });
  };

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, { bottom }]}>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={hideSnackbar} style={styles.closeButton}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Snackbar;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 20,
    width: width,
    backgroundColor: "#333",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  message: {
    color: "white",
    fontSize: 14,
    flex: 1,
  },
  closeButton: {
    marginLeft: 10,
    padding: 4,
  },
  closeText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
