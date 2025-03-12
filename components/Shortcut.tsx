import { StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/constants/theme";
import { Button } from "@/components/Button";

export type ShortcutProps = {
  title: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  onPress?: () => void;
};

export function Shortcut(props: ShortcutProps) {
  const { title, icon, onPress = () => {} } = props;
  return (
    <Button style={styles.quickActionTouchable} onPress={onPress}>
      <Ionicons name={icon} size={theme.fontSize16} />
      <ThemedText fontSize={theme.fontSize14} fontWeight="medium">
        {title}
      </ThemedText>
    </Button>
  );
}

const styles = StyleSheet.create({
  quickActionTouchable: {
    flex: 1,
    height: theme.space16 * 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.borderRadius10,
    gap: theme.space8,
  },
});
