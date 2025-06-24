import AddTaskForm from "@/components/add-task-form";
import FloatingActionButton from "@/components/floating-action-button";
import TaskCard from "@/components/task-card";
import { db } from "@/config/firebase";
import { theme } from "@/constants/theme";
import { USER_ID } from "@/constants/variables";
import { DataType, STATUS } from "@/type/home";
import { getData } from "@/utils/storage-manager";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export const data: DataType[] = [
  { id: 1, name: "hi", status: STATUS.TODO },
  { id: 2, name: "hello", status: STATUS.INPROGRESS },
  { id: 3, name: "how r u", status: STATUS.COMPLETE },
];

function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [taskData, setTaskData] = useState<DataType[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const getUserId = async () => {
    const response = await getData<string>(USER_ID);
    setUserId(response);
  };

  const getTaskData = useCallback(async () => {
    const q = query(collection(db, "tasks"), where("user", "==", userId));
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((doc) => doc.data());

    setTaskData(data as DataType[]);
  }, [userId]);

  useEffect(() => {
    console.log("hi");

    if (userId) getTaskData();
  }, [userId]);

  useEffect(() => {
    getUserId();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>My Tasks</Text>
      </View>
      <FlatList
        data={taskData}
        renderItem={({ item, index }) => (
          <TaskCard item={item} index={index} refetchData={getTaskData} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getTaskData} />
        }
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={20}
        windowSize={10}
      />

      <FloatingActionButton handlePress={() => setIsOpen(true)} />
      <AddTaskForm
        handleClose={handleClose}
        open={isOpen}
        refetchData={getTaskData}
      />
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    paddingTop: Platform.OS === "android" ? theme.padding.large : 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.padding.medium,
    paddingVertical: theme.padding.small,
    backgroundColor: theme.colors.headerBackground,
    marginBottom: theme.margin.medium,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.header,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  addButton: {
    padding: theme.padding.small,
    borderRadius: theme.borderRadius.small,
    backgroundColor: theme.colors.buttonBackground,
  },
  listContent: {
    paddingHorizontal: theme.padding.medium,
    paddingBottom: theme.padding.large,
  },
});
