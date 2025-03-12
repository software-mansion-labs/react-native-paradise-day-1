import { theme } from "@/constants/theme";

import { Text, TextStyle, StyleSheet, View } from "react-native";
import React from "react";

export type ThemedTextProps = {
  color?: string;
  fontSize?: TextStyle["fontSize"];
  fontWeight?: "light" | "regular" | "medium" | "bold";
} & Text["props"];

export function CenteredThemedText(props: ThemedTextProps) {
  return (
    <View style={styles.centerTextContainer}>
      <ThemedText {...props} />
    </View>
  );
}

export function ThemedText(props: ThemedTextProps) {
  const {
    color,
    style,
    fontSize = theme.fontSize16,
    fontWeight = "regular",
    ...otherProps
  } = props;

  const fontFamily = theme.fonts[fontWeight];

  return (
    <Text
      style={[
        {
          color,
          fontSize,
          fontFamily,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  centerTextContainer: {
    alignSelf: "center",
    justifyContent: "center",
  },
});
