import { StyleSheet, View } from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";
import { theme } from "@/constants/theme";

export type PageHeaderProps = {
  title: string;
};

export function PageHeader(props: PageHeaderProps) {
  const { title } = props;
  return (
    <View style={styles.container}>
      <ThemedText fontSize={theme.fontSize32} fontWeight="bold">
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
