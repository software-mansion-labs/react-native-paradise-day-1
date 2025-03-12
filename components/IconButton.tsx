import { StyleSheet, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { FontSize, FontSizeToken, theme } from "@/constants/theme";
import { Button } from "@/components/Button";

export type IconButtonProps = {
  title: string;
  subtitle?: string;
  iconSize?: FontSizeToken;
  titleSize?: FontSizeToken;
  subtitleSize?: FontSizeToken;
  iconStyle?: React.ComponentProps<typeof Ionicons>["style"];
  buttonStyle?: React.ComponentProps<typeof Button>["style"];
  onPress?: () => void;
  icon: React.ComponentProps<typeof Ionicons>["name"];
};

export function IconButton(props: IconButtonProps) {
  const {
    title,
    subtitle,
    onPress = () => {},
    icon,
    iconSize = "16",
    titleSize = "14",
    subtitleSize = "10",
    iconStyle,
    buttonStyle,
  } = props;

  const parsedIconSize = theme[("fontSize" + iconSize) as FontSize];
  const parsedTitleSize = theme[("fontSize" + titleSize) as FontSize];
  const parsedSubtitleSize = theme[("fontSize" + subtitleSize) as FontSize];

  return (
    <Button
      style={[styles.settingTouchable, buttonStyle]}
      onPress={onPress}
      backgroundColor={theme.colors.white}
      pressedBackgroundColor={theme.colors.black10}>
      <View style={styles.setting}>
        <View style={styles.settingIcon}>
          <Ionicons name={icon} size={parsedIconSize} style={iconStyle} />
        </View>
        <View style={styles.settingTextContainer}>
          <ThemedText fontSize={parsedTitleSize} fontWeight="medium">
            {title}
          </ThemedText>
          {subtitle && (
            <ThemedText
              fontSize={parsedSubtitleSize}
              color={theme.colors.black60}>
              {subtitle}
            </ThemedText>
          )}
        </View>
      </View>
    </Button>
  );
}

const styles = StyleSheet.create({
  settingTouchable: {
    paddingVertical: theme.space16,
  },
  setting: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    marginHorizontal: theme.space16,
  },
  settingTextContainer: {
    flexDirection: "column",
    gap: 4,
  },
});
