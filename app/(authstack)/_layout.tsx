import { HideSplash } from "@/components/HideSplash";
import { defaults } from "@/constants/defaults";
import { LoadingScreen } from "@/screens/LoadingScreen";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import React from "react";

export default function Layout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return (
      <>
        <LoadingScreen />
        <Redirect href="/" />
      </>
    );
  }

  return (
    <>
      <HideSplash />
      <Stack screenOptions={defaults.navigation.authStack} />;
    </>
  );
}
