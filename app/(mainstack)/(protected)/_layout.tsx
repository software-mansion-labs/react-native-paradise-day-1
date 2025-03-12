import React from "react";
import { Redirect, Stack } from "expo-router";
import { defaults } from "@/constants/defaults";
import { useAuth } from "@clerk/clerk-expo";
import { LoadingScreen } from "@/screens/LoadingScreen";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function Layout() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return (
      <>
        <LoadingScreen />
        <Redirect href="/sign-in" />
      </>
    );
  }

  return (
    <Stack screenOptions={defaults.navigation.mainStack}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="rides" options={{ animation: "none" }} />
      <Stack.Screen name="user" options={{ presentation: "formSheet" }} />
    </Stack>
  );
}
