import { View, StyleSheet } from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";
import { theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@/components/Button";

export type SearchBarProps = {
  placeholder: string;
  showLaterButton?: boolean;
  onPress?: () => void;
};

function LaterButton(props: { onPress?: () => void }) {
  const { onPress = () => {} } = props;

  return (
    <Button
      style={styles.laterIconTouchable}
      onPress={onPress}
      backgroundColor={theme.colors.white}
      pressedBackgroundColor={theme.colors.black30}>
      <Ionicons
        name="calendar-clear"
        size={theme.fontSize18}
        color={theme.colors.green}
      />
      <ThemedText
        fontSize={theme.fontSize12}
        fontWeight="medium"
        color={theme.colors.green}>
        Later
      </ThemedText>
    </Button>
  );
}

export function SearchBar(props: SearchBarProps) {
  const { placeholder, showLaterButton = true, onPress } = props;

  return (
    <Button style={styles.touchable} onPress={onPress}>
      <Ionicons name="search" size={22} color={theme.colors.black60} />

      <ThemedText
        fontSize={theme.fontSize16}
        fontWeight="medium"
        color={theme.colors.black70}
        style={styles.placeholder}>
        {placeholder}
      </ThemedText>

      {showLaterButton && (
        <View style={styles.laterContainer}>
          <LaterButton />
        </View>
      )}
    </Button>
  );
}

const styles = StyleSheet.create({
  touchable: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space12,
    paddingVertical: theme.space12,
    paddingHorizontal: theme.space16,
    borderRadius: theme.borderRadiusFull,
  },
  inputContainer: {
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize16,
    color: theme.colors.black,
    padding: 0,
  },
  placeholder: {
    flex: 1,
  },
  laterContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  laterIconTouchable: {
    flexDirection: "row",
    borderRadius: theme.borderRadius10,

    paddingVertical: theme.space8,
    paddingHorizontal: theme.space12,
    gap: theme.space8,
    alignItems: "center",
    ...theme.shadows.small,
  },
});
