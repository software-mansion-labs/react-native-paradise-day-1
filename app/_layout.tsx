import React from "react";
import { Slot } from "expo-router";
import { ToastProvider } from "@/components/ToastProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { initializeSentry, SentryNavigationIntegration } from "@/sentry/sentry";
import { ThemeProvider } from "@react-navigation/native";
import { theme } from "@/constants/theme";
import { LogBox } from "react-native";
import { setupBackgroundUpdates } from "@/background/UpdatesTask";
import * as Sentry from "@sentry/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

initializeSentry();

LogBox.uninstall();

setupBackgroundUpdates();

function Layout() {
  return (
    <ThemeProvider value={theme.navigationTheme}>
      <QueryClientProvider client={queryClient}>
        <SentryNavigationIntegration>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Slot />
            <ToastProvider />
          </GestureHandlerRootView>
        </SentryNavigationIntegration>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default Sentry.wrap(Layout);
