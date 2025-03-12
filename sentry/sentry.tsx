import { useUser } from "@clerk/clerk-expo";
import * as Sentry from "@sentry/react-native";
import { useNavigationContainerRef } from "expo-router";
import React from "react";
import yn from "yn";

const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: true,
});

export function initializeSentry() {
  Sentry.init({
    debug: false,
    enabled: yn(process.env.EXPO_PUBLIC_ENABLE_SENTRY || false),
    dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
    environment: process.env.EXPO_PUBLIC_ENV,
    integrations(integrations) {
      integrations.push(
        navigationIntegration,
        Sentry.reactNativeTracingIntegration()
      );

      // Dedupe integration doesn't work well with expo router
      return integrations.filter((i) => i.name !== "Dedupe");
    },
    enableAutoSessionTracking: true,
    // For testing, session close when 5 seconds (instead of the default 30) in the background.
    sessionTrackingIntervalMillis: 5000,
    enableTracing: true,
    tracesSampleRate: 1.0,
    tracePropagationTargets: ["localhost", /^\//, /^https:\/\//, /^http:\/\//],
    attachStacktrace: true,
    attachScreenshot: true,
    attachViewHierarchy: true,
    enableCaptureFailedRequests: true,
    profilesSampleRate: 1.0,
    replaysSessionSampleRate: 1.0,
  });
}

export function WithSentryUser() {
  // TODO(sentry-user): Add user to Sentry
  const { user } = useUser();

  React.useEffect(() => {
    if (!user) {
      Sentry.setUser(null);
      return;
    }

    Sentry.setUser({
      id: user.id,
      email: user?.emailAddresses?.[0]?.emailAddress || "unknown",
      username: user?.username || "unknown",
    });
  }, [user]);

  return null;
}

export function SentryNavigationIntegration(props: {
  children: React.ReactNode;
}) {
  const ref = useNavigationContainerRef();
  React.useEffect(() => {
    if (ref) {
      navigationIntegration.registerNavigationContainer(ref);
    }
  }, [ref]);

  return props.children;
}

export function wrapUsingSentry(component: React.ComponentType) {
  return Sentry.wrap(component);
}
