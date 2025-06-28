import { db } from "@/config/firebase";
import { DataType, STATUS } from "@/type/home";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeInDown,
  FadeOutRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface TaskCardProps {
  index: number;
  item: DataType;
  refetchData: () => void;
}

const TaskCard = ({ index, item, refetchData }: TaskCardProps) => {
  const scale = useSharedValue(1);
  const checkmarkScale = useSharedValue(1);

  // Status configuration with enhanced styling
  const getStatusConfig = (status: STATUS) => {
    switch (status) {
      case STATUS.TODO:
        return {
          color: "#F59E0B",
          backgroundColor: "#FEF3C7",
          borderColor: "#F59E0B",
          icon: "ellipse-outline",
          label: "To Do",
          gradient: ["#FEF3C7", "#FDE68A"],
          textColor: "#92400E",
        };
      case STATUS.INPROGRESS:
        return {
          color: "#3B82F6",
          backgroundColor: "#DBEAFE",
          borderColor: "#3B82F6",
          icon: "play-circle-outline",
          label: "In Progress",
          gradient: ["#DBEAFE", "#BFDBFE"],
          textColor: "#1E40AF",
        };
      case STATUS.COMPLETE:
        return {
          color: "#10B981",
          backgroundColor: "#D1FAE5",
          borderColor: "#10B981",
          icon: "checkmark-circle",
          label: "Completed",
          gradient: ["#D1FAE5", "#A7F3D0"],
          textColor: "#047857",
        };
      default:
        return {
          color: "#EF4444",
          backgroundColor: "#FEE2E2",
          borderColor: "#EF4444",
          icon: "alert-circle-outline",
          label: "Unknown",
          gradient: ["#FEE2E2", "#FECACA"],
          textColor: "#DC2626",
        };
    }
  };

  const statusConfig = getStatusConfig(item.status);

  const handleStatusChange = async () => {
    try {
      // Animate checkmark
      checkmarkScale.value = withSpring(1.3, {}, () => {
        checkmarkScale.value = withSpring(1);
      });

      const taskRef = doc(db, "tasks", item.id.toString());
      const nextStatus =
        item.status === STATUS.TODO
          ? STATUS.INPROGRESS
          : item.status === STATUS.INPROGRESS
          ? STATUS.COMPLETE
          : null;

      if (nextStatus) {
        const newData = { ...item, status: nextStatus };
        await updateDoc(taskRef, newData);
        refetchData();
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      Alert.alert("Error", "Failed to update task status. Please try again.");
    }
  };

  const handleDeleteTask = async () => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const taskRef = doc(db, "tasks", item.id.toString());
            await deleteDoc(taskRef);
            refetchData();
          } catch (error) {
            console.error("Error deleting task:", error);
            Alert.alert("Error", "Failed to delete task. Please try again.");
          }
        },
      },
    ]);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const checkmarkAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkmarkScale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const getPriorityColor = () => {
    const priorities = ["#EF4444", "#F59E0B", "#10B981"];
    return priorities[item.id % 3];
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100).springify()}
      exiting={FadeOutRight.duration(300)}
    >
      {/* Main card */}
      <Animated.View style={animatedStyle}>
        <Pressable
          onPress={handleStatusChange}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onLongPress={handleDeleteTask}
          style={({ pressed }) => [
            styles.taskCard,
            {
              borderLeftColor: statusConfig.borderColor,
              transform: [{ scale: pressed ? 0.98 : 1 }],
            },
          ]}
        >
          <LinearGradient
            colors={["#FFFFFF", "#FAFAFA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            {/* Priority indicator */}
            <View
              style={[
                styles.priorityIndicator,
                { backgroundColor: getPriorityColor() },
              ]}
            />

            <View style={styles.taskHeader}>
              <View style={styles.taskMeta}>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: statusConfig.backgroundColor },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      { color: statusConfig.textColor },
                    ]}
                  >
                    {statusConfig.label}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.taskContent}>
              <View style={styles.taskInfo}>
                <Text
                  style={[
                    styles.taskText,
                    item.status === STATUS.COMPLETE && styles.completedText,
                  ]}
                >
                  {item.name}
                </Text>
                <Text style={styles.taskDescription} numberOfLines={2}>
                  Tap to mark as{" "}
                  {item.status === STATUS.TODO
                    ? "in progress"
                    : item.status === STATUS.INPROGRESS
                    ? "complete"
                    : "done"}
                </Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.checkButton,
                  { backgroundColor: statusConfig.backgroundColor },
                ]}
                onPress={handleStatusChange}
                activeOpacity={0.7}
              >
                <Animated.View style={checkmarkAnimatedStyle}>
                  <Ionicons
                    name={statusConfig.icon as any}
                    size={28}
                    color={statusConfig.color}
                  />
                </Animated.View>
              </TouchableOpacity>
            </View>

            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width:
                        item.status === STATUS.TODO
                          ? "33%"
                          : item.status === STATUS.INPROGRESS
                          ? "66%"
                          : "100%",
                      backgroundColor: statusConfig.color,
                    },
                  ]}
                />
              </View>
            </View>

            <View style={styles.actionHint}>
              <Text style={styles.actionHintText}>Long press to delete</Text>
            </View>
          </LinearGradient>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: "hidden",
  },
  cardGradient: {
    padding: 20,
  },
  priorityIndicator: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 12,
  },
  taskHeader: {
    marginBottom: 12,
  },
  taskMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  dateText: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  taskContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  taskInfo: {
    flex: 1,
    marginRight: 16,
  },
  taskText: {
    color: "#1F2937",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    lineHeight: 22,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#9CA3AF",
  },
  taskDescription: {
    color: "#6B7280",
    fontSize: 14,
    lineHeight: 20,
    fontStyle: "italic",
  },
  checkButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 3,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
    // transition: 'width 0.3s ease',
  },
  swipeHint: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  swipeHintText: {
    fontSize: 10,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#FEE2E2",
  },
  actionHint: {
    alignItems: "center",
    justifyContent: "center",
  },
  actionHintText: {
    fontSize: 10,
    color: "#9CA3AF",
    fontWeight: "500",
  },
});
