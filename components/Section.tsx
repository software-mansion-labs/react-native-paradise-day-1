import { View, StyleSheet } from "react-native";
import React from "react";
import { theme } from "@/constants/theme";

export type SectionProps = React.ComponentProps<typeof View> & {
  isRow?: boolean;
};

export function Section(props: SectionProps) {
  const { style, isRow, ...otherProps } = props;

  return (
    <View
      {...otherProps}
      style={[
        styles.section,
        style,
        isRow
          ? {
              flexDirection: "row",
              justifyContent: "space-evenly",
            }
          : {},
      ]}
    />
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: theme.space16,
    gap: theme.space16,
    marginBottom: theme.space16,
  },
});
