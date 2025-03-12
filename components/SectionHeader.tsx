import { StyleSheet, View } from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";
import { theme } from "@/constants/theme";

export type SectionHeaderProps = {
  title: string;
};

export function SectionHeader(props: SectionHeaderProps) {
  const { title } = props;
  return (
    <View style={styles.container}>
      <ThemedText fontSize={theme.fontSize18} fontWeight="medium">
        {title}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: theme.space8,
    paddingHorizontal: theme.space16,
    marginBottom: theme.space16,
  },
});
