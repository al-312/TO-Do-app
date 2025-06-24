import { db } from "@/config/firebase";
import { theme } from "@/constants/theme";
import { USER_ID } from "@/constants/variables";
import { STATUS } from "@/type/home";
import { getData } from "@/utils/storage-manager";
import { collection, doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import CustomModel from "../custom-model";
import PrimaryButton from "../primaty-button";

interface AddTaskFormProps {
  handleClose: () => void;
  open: boolean;
  refetchData: () => void;
}

const AddTaskForm = ({ handleClose, open, refetchData }: AddTaskFormProps) => {
  const [taskName, setTaskName] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);

  const getUserId = async () => {
    const response = await getData<string>(USER_ID);
    setUserId(response);
  };

  const handleSubmit = async () => {
    if (taskName === "") {
      console.error("taskName is empty");
      return;
    }

    if (userId) {
      const newDocRef = doc(collection(db, "tasks"));
      await setDoc(doc(db, "tasks", newDocRef.id), {
        id: newDocRef.id,
        name: taskName,
        status: STATUS.TODO,
        user: userId,
      });
      setTaskName("");
      handleClose();
      refetchData();
    }
  };

  useEffect(() => {
    getUserId();
  }, []);

  return (
    <CustomModel handleClose={handleClose} isOpen={open} title="Add Task">
      <View style={styles.container}>
        <TextInput
          placeholder="Enter your task"
          value={taskName}
          onChangeText={setTaskName}
          style={styles.input}
          placeholderTextColor={theme.colors.textSecondary}
        />
        <PrimaryButton handlePress={handleSubmit} text="Submit" />
      </View>
    </CustomModel>
  );
};

export default AddTaskForm;

const styles = StyleSheet.create({
  container: {
    margin: theme.margin.small,
  },
  input: {
    width: "100%",
    padding: theme.padding.medium,
    borderRadius: theme.borderRadius.small,
    fontSize: theme.fontSizes.body,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: theme.margin.medium,
  },
});
