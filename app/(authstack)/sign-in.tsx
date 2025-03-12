import React from "react";

import { SignInScreen } from "@/screens/SignInScreen";
import { useRouter } from "expo-router";

export default function SignIn() {
  const router = useRouter();

  return (
    <SignInScreen
      navigateToHome={() => router.replace("/")}
      navigateToSignUp={() => router.replace("/sign-up")}
    />
  );
}
