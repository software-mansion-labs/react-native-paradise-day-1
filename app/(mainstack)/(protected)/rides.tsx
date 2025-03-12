import { RidesScreen } from "@/screens/RidesScreen";
import React from "react";
import { useRouter } from "expo-router";

export default function Rides() {
  const router = useRouter();

  return (
    <RidesScreen
      navigateToHome={() => {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace("/");
        }
      }}
    />
  );
}
