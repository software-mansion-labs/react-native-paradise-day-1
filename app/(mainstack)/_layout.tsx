import React from "react";
import { Stack } from "expo-router";
import { defaults } from "@/constants/defaults";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function Layout() {
  return (
    <Stack screenOptions={defaults.navigation.mainStack}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="rides" options={{ animation: "none" }} />
      <Stack.Screen name="user" options={{ presentation: "formSheet" }} />
    </Stack>
  );
}
