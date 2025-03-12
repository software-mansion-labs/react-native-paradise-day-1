import { AccountScreen } from "@/screens/AccountScreen";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React from "react";

export default function Account() {
  const router = useRouter();
  const { signOut } = useAuth();

  return (
    <AccountScreen
      signOut={async () => {
        await signOut();
        router.replace("/sign-in");
      }}
      navigateToUser={() => {
        router.push("/user");
      }}
    />
  );
}
