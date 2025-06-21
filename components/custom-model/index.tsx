import AntDesign from "@expo/vector-icons/AntDesign";
import { ReactNode } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
    <>
      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={handleClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modelTitle}>
              <Text style={styles.modalText}>{title}</Text>
              <TouchableOpacity activeOpacity={0.8} onPress={handleClose}>
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.modelContent}>{children}</View>
          </View>
        </View>
      </Modal>
    </>
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
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    textAlign: "center",
    color: "black",
    marginBottom: 15,
  },
  modelTitle: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 2,
    paddingBottom: 2,
  },
  modelContent: {
    width: "100%",
  },
});
