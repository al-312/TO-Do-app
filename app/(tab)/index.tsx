import FloatingActionButton from "@/components/floating-action-button";
import TaskCard from "@/components/task-card";
import { theme } from "@/constants/theme";
import { STATUS } from "@/type/home";
import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const data = [
  { id: 1, name: "hi", status: STATUS.TODO },
  { id: 2, name: "hello", status: STATUS.INPROGRESS },
  { id: 3, name: "how r u", status: STATUS.COMPLETE },
];

function Home() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>My Tasks</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item, index }) => <TaskCard item={item} index={index} />}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={20}
        windowSize={10}
      />

      <FloatingActionButton handlePress={() => console.log("first")} />
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
