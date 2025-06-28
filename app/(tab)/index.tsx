import AddTaskForm from "@/components/add-task-form";
import FloatingActionButton from "@/components/floating-action-button";
import TaskCard from "@/components/task-card";
import { db } from "@/config/firebase";
import { USER_ID } from "@/constants/variables";
import { DataType, STATUS } from "@/type/home";
import { getData } from "@/utils/storage-manager";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export const data: DataType[] = [
  { id: 1, name: "hi", status: STATUS.TODO },
  { id: 2, name: "hello", status: STATUS.INPROGRESS },
  { id: 3, name: "how r u", status: STATUS.COMPLETE },
];

const TaskProgress = ({ tasks }: { tasks: DataType[] }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === STATUS.COMPLETE
  ).length;
  const progressPercentage =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const progressWidth = useSharedValue(0);

  useEffect(() => {
    progressWidth.value = withSpring(progressPercentage);
  }, [progressPercentage, progressWidth]);

  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: `${interpolate(progressWidth.value, [0, 100], [0, 100])}%`,
  }));

  return (
    <Animated.View
      entering={FadeInUp.delay(200).springify()}
      style={styles.progressContainer}
    >
      <View style={styles.progressHeader}>
        <Text style={styles.progressTitle}>Today&apos;s Progress</Text>
        <Text style={styles.progressPercentage}>
          {Math.round(progressPercentage)}%
        </Text>
      </View>
      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBar, animatedProgressStyle]} />
      </View>
      <Text style={styles.progressText}>
        {completedTasks} of {totalTasks} tasks completed
      </Text>
    </Animated.View>
  );
};

const EmptyState = () => (
  <Animated.View
    entering={FadeInUp.delay(300).springify()}
    style={styles.emptyContainer}
  >
    <View style={styles.emptyIconContainer}>
      <Text style={styles.emptyIcon}>📝</Text>
    </View>
    <Text style={styles.emptyTitle}>No tasks yet</Text>
    <Text style={styles.emptySubtitle}>
      Tap the + button to add your first task
    </Text>
  </Animated.View>
);

const TaskStats = ({ tasks }: { tasks: DataType[] }) => {
  const todoCount = tasks.filter((task) => task.status === STATUS.TODO).length;
  const inProgressCount = tasks.filter(
    (task) => task.status === STATUS.INPROGRESS
  ).length;
  const completedCount = tasks.filter(
    (task) => task.status === STATUS.COMPLETE
  ).length;

  const StatCard = ({
    title,
    count,
    color,
    icon,
  }: {
    title: string;
    count: number;
    color: string;
    icon: string;
  }) => (
    <Animated.View
      entering={FadeInUp.delay(400).springify()}
      style={[styles.statCard, { borderLeftColor: color }]}
    >
      <Text style={styles.statIcon}>{icon}</Text>
      <View style={styles.statContent}>
        <Text style={styles.statCount}>{count}</Text>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.statsContainer}>
      <StatCard title="To Do" count={todoCount} color="#FF6B6B" icon="📋" />
      <StatCard
        title="In Progress"
        count={inProgressCount}
        color="#4ECDC4"
        icon="⚡"
      />
      <StatCard
        title="Completed"
        count={completedCount}
        color="#45B7D1"
        icon="✅"
      />
    </View>
  );
};

function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [taskData, setTaskData] = useState<DataType[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const getUserId = async () => {
    try {
      const response = await getData<string>(USER_ID);
      setUserId(response);
    } catch (error) {
      console.error("Error getting user ID:", error);
    }
  };

  const getTaskData = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const q = query(collection(db, "tasks"), where("user", "==", userId));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => doc.data());

      setTaskData(data as DataType[]);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) getTaskData();
  }, [userId, getTaskData]);

  useEffect(() => {
    getUserId();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getTaskData();
  }, [getTaskData]);

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning! 🌅";
    if (hour < 17) return "Good Afternoon! ☀️";
    return "Good Evening! 🌙";
  };

  const ListHeader = () => (
    <View>
      <TaskProgress tasks={taskData} />
      <TaskStats tasks={taskData} />
      <Animated.View
        entering={FadeInUp.delay(100).springify()}
        style={styles.sectionHeader}
      >
        <Text style={styles.sectionTitle}>Your Tasks</Text>
        <View style={styles.taskCountBadge}>
          <Text style={styles.taskCountText}>{taskData.length}</Text>
        </View>
      </Animated.View>
    </View>
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#6366F1" />
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.headerGradient}>
          <Animated.View
            entering={FadeInDown.delay(100).springify()}
            style={styles.headerContent}
          >
            <View style={styles.greetingSection}>
              <Text style={styles.greeting}>{getCurrentGreeting()}</Text>
              <Text style={styles.title}>My Tasks</Text>
            </View>
          </Animated.View>
        </View>

        <View style={styles.contentContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#6366F1" />
              <Text style={styles.loadingText}>Loading your tasks...</Text>
            </View>
          ) : (
            <FlatList
              data={taskData}
              renderItem={({ item, index }) => (
                <Animated.View
                  entering={FadeInUp.delay(index * 100).springify()}
                >
                  <TaskCard
                    item={item}
                    index={index}
                    refetchData={getTaskData}
                  />
                </Animated.View>
              )}
              ListHeaderComponent={taskData.length > 0 ? ListHeader : null}
              ListEmptyComponent={EmptyState}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={["#6366F1"]}
                  tintColor="#6366F1"
                />
              }
              keyExtractor={(item) => String(item.id)}
              contentContainerStyle={[
                styles.listContent,
                taskData.length === 0 && styles.emptyListContent,
              ]}
              showsVerticalScrollIndicator={false}
              initialNumToRender={10}
              maxToRenderPerBatch={20}
              windowSize={10}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeparator} />
              )}
            />
          )}
        </View>

        <FloatingActionButton handlePress={() => setIsOpen(true)} />
        <AddTaskForm
          handleClose={handleClose}
          open={isOpen}
          refetchData={getTaskData}
        />
      </SafeAreaView>
    </>
  );
}

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  headerGradient: {
    backgroundColor: "#273F4F",
    paddingTop: Platform.OS === "android" ? 40 : 0,
    paddingBottom: 20,
    // borderRadius: 24,
    // borderBottomLeftRadius: 24,
    // borderBottomRightRadius: 24,
    ...Platform.select({
      ios: {
        shadowColor: "#6366F1",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  greetingSection: {
    flex: 1,
  },
  greeting: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  contentContainer: {
    flex: 1,
    // marginTop: -12,
    backgroundColor: "#F8FAFC",
    // borderTopLeftRadius: 24,
    // borderTopRightRadius: 24,
  },
  progressContainer: {
    backgroundColor: "#FFFFFF",
    // marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: "700",
    color: "#6366F1",
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "linear-gradient(90deg, #6366F1, #8B5CF6)",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
  statsContainer: {
    marginTop: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    flexDirection: "row",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  statIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  statContent: {
    flex: 1,
  },
  statCount: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 2,
  },
  statTitle: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  sectionHeader: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
  },
  taskCountBadge: {
    backgroundColor: "#6366F1",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  taskCountText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  itemSeparator: {
    height: 12,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyIcon: {
    fontSize: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    paddingHorizontal: 40,
    lineHeight: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#6B7280",
  },
});
