import React from "react";
import * as Updates from "expo-updates";

import { UpdateManager } from "@/components/UpdateManager";
import { HideSplash } from "@/components/HideSplash";

// TODO(updates-api): Write a function that checks for updates
async function checkForUpdates(): Promise<Updates.UpdateCheckResult> {
  return await Updates.checkForUpdateAsync();
}

// TODO(updates-api): Write a function that fetches updates
async function fetchUpdate(): Promise<Updates.UpdateFetchResult> {
  return await Updates.fetchUpdateAsync();
}

// TODO(updates-api): Write a function that restarts the app
async function restartApp(): Promise<void> {
  return await Updates.reloadAsync();
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
