import React from "react";
import { UserScreen } from "@/screens/UserScreen";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function User() {
  const router = useRouter();
  const { signOut } = useAuth();

  return (
    <UserScreen
      signOut={async () => {
        await signOut();
        router.replace("/sign-in");
      }}
    />
  );
}
