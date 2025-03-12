import React from "react";
import { HomeScreen } from "@/screens/HomeScreen";
import { useRouter } from "expo-router";

import * as Sentry from "@sentry/react";

const HomeWithProfiler = Sentry.withProfiler(HomeScreen, {
  name: "Home",
  includeRender: true,
  includeUpdates: true,
});

export default function Home() {
  const router = useRouter();
  return (
    <HomeWithProfiler
      navigateToRides={() => {
        router.push("/rides");
      }}
    />
  );
}
