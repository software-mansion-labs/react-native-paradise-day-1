import React from "react";
import * as Updates from "expo-updates";

import { UpdateManager } from "@/components/UpdateManager";
import { delay } from "@/utils/delay";
import { HideSplash } from "@/components/HideSplash";

// TODO(updates-api): Write a function that checks for updates
async function checkForUpdates(): Promise<Updates.UpdateCheckResult> {
  await delay(400);
  return {
    isAvailable: true,
    manifest: {
      id: "b14c571a-2155-4578-aab3-fa42c1decf4d",
      createdAt: "Mar 8, 2025 12:32 AM",
    },
  } as Updates.UpdateCheckResultAvailable;
}

// TODO(updates-api): Write a function that fetches updates
async function fetchUpdate(): Promise<Updates.UpdateFetchResult> {
  await delay(400);
  return {
    isNew: true,
  } as Updates.UpdateFetchResultSuccess;
}

// TODO(updates-api): Write a function that restarts the app
async function restartApp(): Promise<void> {
  await delay(400);
}

export default function UpdatesRoute() {
  return (
    <>
      <HideSplash />
      <UpdateManager
        checkForUpdate={checkForUpdates}
        fetchUpdate={fetchUpdate}
        restartApp={restartApp}
      />
    </>
  );
}
