import { theme } from "@/constants/theme";
import { DataType, STATUS } from "@/type/home";
import { Ionicons } from "@expo/vector-icons";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

interface TaskCardProps {
  index: number;
  item: DataType;
}

const TaskCard = ({ index, item }: TaskCardProps) => {
  let color;
  switch (item.status) {
    case STATUS.TODO:
      color = "orange";
      break;
    case STATUS.INPROGRESS:
      color = "blue";
      break;
    case STATUS.COMPLETE:
      color = "green";
      break;
    default:
      color = "red";
      break;
  }
  return (
    <>
      <Animated.View
        entering={FadeInDown.delay(index * 100).springify()}
        style={styles.taskCard}
      >
        <View style={styles.taskContent}>
          <Text style={styles.taskText}>{item.name}</Text>
          <TouchableOpacity style={styles.checkButton}>
            <Ionicons name="checkmark-circle-outline" size={24} color={color} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.medium,
    marginBottom: theme.margin.medium,
    padding: theme.padding.medium,
    ...Platform.select({
      ios: theme.shadow.ios,
    }),
  },
  taskContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontWeight: "500",
    flex: 1,
  },
  checkButton: {
    padding: theme.padding.small,
    borderRadius: theme.borderRadius.small,
  },
});
