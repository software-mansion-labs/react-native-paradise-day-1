import { View, ActivityIndicator } from "react-native";
import React from "react";
import { theme } from "@/constants/theme";

export function LoadingScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <ActivityIndicator size="large" color={theme.colors.green} />
    </View>
  );
}
