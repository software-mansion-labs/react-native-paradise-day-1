import React from "react";
import { Stack } from "expo-router";
import { defaults } from "@/constants/defaults";

export const unstable_settings = {
  initialRouteName: "(protected)",
};

export default function Layout() {
  return (
    <Stack screenOptions={defaults.navigation.mainStack}>
      <Stack.Screen
        name="(protected)"
        options={{
          animation: "none",
        }}
      />
    </Stack>
  );
}
