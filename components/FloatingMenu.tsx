import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/constants/theme";
import { Button } from "@/components/Button";
import { IconButton } from "@/components/IconButton";
import Animated, {
  FadeIn,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";
import { router } from "expo-router";

const menuItems = [
  {
    title: "Environment",
    icon: "bug",
    action: () => {
      router.push("/(mainstack)/environment");
    },
  },
  {
    title: "Updates",
    icon: "cloud-download",
    action: () => {
      router.push("/(mainstack)/updates");
    },
  },
] as const;

export function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View style={styles.container}>
      {isOpen && (
        <Animated.View>
          {menuItems.map((item, index) => (
            <Animated.View
              key={item.title}
              entering={SlideInDown.springify()
                .damping(15)
                .mass(0.9)
                .withInitialValues({ transform: [{ translateY: -50 }] })
                .delay(index * 50)}
              exiting={SlideOutDown.duration(200).delay(index * 30)}>
              <IconButton
                title={item.title}
                icon={item.icon}
                iconSize="24"
                titleSize="16"
                buttonStyle={styles.menuItem}
                onPress={() => {
                  item.action();
                  setIsOpen(false);
                }}
              />
            </Animated.View>
          ))}
        </Animated.View>
      )}
      <Animated.View entering={FadeIn}>
        <Button
          style={styles.fab}
          backgroundColor={theme.colors.black}
          pressedBackgroundColor={theme.colors.black70}
          onPress={() => setIsOpen(!isOpen)}>
          <Animated.View
            style={{
              transform: [{ rotate: isOpen ? "180deg" : "0deg" }],
            }}>
            <Ionicons
              name={isOpen ? "close" : "menu"}
              size={24}
              color={theme.colors.white}
            />
          </Animated.View>
        </Button>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: theme.space24,
    right: theme.space24,
    alignItems: "flex-end",
    gap: theme.space8,
  },
  fab: {
    width: theme.space16 * 3.5,
    height: theme.space16 * 3.5,
    borderRadius: theme.borderRadiusFull,
    justifyContent: "center",
    alignItems: "center",
    ...theme.shadows.small,
  },

  menuItem: {
    paddingVertical: theme.space12,
    paddingRight: theme.space16,
    borderRadius: theme.borderRadius10,
    marginVertical: theme.space8,
    ...theme.shadows.small,
  },
});
