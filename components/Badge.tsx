import { StyleSheet, View } from "react-native";
import React from "react";
import { FontSize, FontSizeToken, theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";

export type BadgeProps = {
  text: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  iconSize: FontSizeToken;
  textSize: FontSizeToken;
  backgroundColor?: string;
  showCaret?: boolean;
} & React.ComponentProps<typeof View>;

export function Badge(props: BadgeProps) {
  const {
    text,
    icon,
    iconSize,
    textSize,
    backgroundColor,
    style,
    showCaret = false,
    ...other
  } = props;

  const parsedIconSize = theme[("fontSize" + iconSize) as FontSize];
  const parsedTextSize = theme[("fontSize" + textSize) as FontSize];

  return (
    <View
      style={[
        style,
        {
          alignSelf: "flex-start",
          borderRadius: theme.borderRadius10,
          backgroundColor,
        },
      ]}
      {...other}>
      <View
        style={[
          styles.badgeContainer,
          {
            paddingVertical: parsedTextSize / 2,
            paddingHorizontal: parsedTextSize,
            gap: parsedTextSize / 2,
          },
        ]}>
        <Ionicons name={icon} size={parsedIconSize} />
        <ThemedText fontSize={parsedTextSize} fontWeight="medium">
          {text}
        </ThemedText>
        {showCaret && <Ionicons name="chevron-down" size={parsedIconSize} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
