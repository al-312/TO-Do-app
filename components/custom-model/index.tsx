import AntDesign from "@expo/vector-icons/AntDesign";
import { ReactNode } from "react";
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

interface CustomModelProps {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  children: ReactNode;
}

const CustomModel = ({
  isOpen,
  handleClose,
  title,
  children,
}: CustomModelProps) => {
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <Animated.View
          entering={FadeInUp.delay(100).springify()}
          style={styles.modalContainer}
        >
          <View style={styles.modelTitle}>
            <Text style={styles.modalText}>{title}</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleClose}
              style={styles.closeButton}
            >
              <AntDesign name="close" size={20} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.modelContent}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default CustomModel;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    width: "90%",
    maxWidth: 400,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  modelTitle: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 16,
  },
  modalText: {
    color: "#1F2937",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "left",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  modelContent: {
    width: "100%",
  },
});
