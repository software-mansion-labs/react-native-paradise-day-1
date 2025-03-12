import React from "react";
import { UserScreen } from "@/screens/UserScreen";
import { useRouter } from "expo-router";

export default function User() {
  const router = useRouter();
  return (
    <UserScreen
      signOut={() => {
        router.replace("/sign-in");
      }}
    />
  );
}
