import { Platform } from "react-native";
import React from "react";
import { TokenCache } from "@clerk/clerk-expo/dist/cache";
import * as SecureStore from "expo-secure-store";
import { ClerkLoading, ClerkProvider } from "@clerk/clerk-expo";
import { ClerkLoaded } from "@clerk/clerk-expo";
import { WithSentryUser } from "@/sentry/sentry";
import { LoadingScreen } from "@/screens/LoadingScreen";
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

const createTokenCache = (): TokenCache => {
  return {
    getToken: async (key: string) => {
      try {
        const item = await SecureStore.getItemAsync(key);
        return item;
      } catch (error) {
        console.error("secure store get item error: ", error);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    saveToken: (key: string, token: string) => {
      return SecureStore.setItemAsync(key, token);
    },
  };
};

const tokenCache = Platform.OS !== "web" ? createTokenCache() : undefined;

export function Clerk(props: { children: React.ReactNode }) {
  if (!publishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <WithSentryUser />
        {props.children}
      </ClerkLoaded>
      <ClerkLoading>
        <LoadingScreen />
      </ClerkLoading>
    </ClerkProvider>
  );
}
