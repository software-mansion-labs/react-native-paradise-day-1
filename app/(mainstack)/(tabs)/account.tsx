import { AccountScreen } from "@/screens/AccountScreen";
import { useRouter } from "expo-router";
import React from "react";

export default function Account() {
  const router = useRouter();
  return (
    <AccountScreen
      navigateToUser={() => {
        router.push("/user");
      }}
    />
  );
}
