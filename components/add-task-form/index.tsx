import { data } from "@/app/(tab)";
import { theme } from "@/constants/theme";
import { STATUS } from "@/type/home";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import CustomModel from "../custom-model";
import PrimaryButton from "../primaty-button";

interface AddTaskFormProps {
  handleClose: () => void;
  open: boolean;
}

const AddTaskForm = ({ handleClose, open }: AddTaskFormProps) => {
  const [taskName, setTaskName] = useState<string>("");

  const handleSubmit = () => {
    console.log(taskName);
    data.push({ id: data.length + 2, name: taskName, status: STATUS.TODO });
    setTaskName("");
    handleClose();
  };

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
