import { View, StyleSheet } from "react-native";
import React from "react";
import { theme } from "@/constants/theme";

export type DividerProps = React.ComponentProps<typeof View> & {
  width?: "regular" | "thin";
};

export function Divider(props: DividerProps) {
  const { style, width = "regular", ...otherProps } = props;
  const borderWidth = width === "regular" ? theme.space4 : 1;
  return (
    <View
      style={[style, { borderBottomWidth: borderWidth }, styles.divider]}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  divider: {
    borderColor: theme.colors.black4,
  },
});
