import { SignUpScreen } from "@/screens/SignUpScreen";
import React from "react";
import { useRouter } from "expo-router";

export default function SignUp() {
  const router = useRouter();

  return (
    <SignUpScreen
      navigateToHome={() => router.replace("/")}
      navigateToSignIn={() => router.replace("/sign-in")}
    />
  );
}
