import { View, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import * as Updates from "expo-updates";
import { ThemedText } from "@/components/ThemedText";
import { theme } from "@/constants/theme";

import Toast from "react-native-toast-message";
import { TopInset } from "@/components/TopInsets";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@/components/Button";

type UpdateInfo = {
  isAvailable: boolean;
  id?: string;
  createdAt?: string;
};

const showToast = (message: string, type: "success" | "error" | "info") => {
  Toast.show({
    type: type,
    text1: type === "error" ? "Error" : "Update Status",
    text2: message,
    position: "bottom",
    visibilityTime: 4000,
  });
};

function useUpdateManager({
  checkForUpdate,
  fetchUpdate,
  restartApp,
}: {
  checkForUpdate: () => Promise<Updates.UpdateCheckResult>;
  fetchUpdate: () => Promise<Updates.UpdateFetchResult>;
  restartApp: () => Promise<void>;
}) {
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo>({
    isAvailable: false,
  });
  const [loading, setLoading] = useState(false);
  const [updateDownloaded, setUpdateDownloaded] = useState(false);

  const check = async () => {
    setLoading(true);
    setUpdateDownloaded(false);
    setUpdateInfo({
      isAvailable: false,
    });

    try {
      const update = await checkForUpdate();

      if (update.isAvailable) {
        setUpdateInfo({
          isAvailable: true,
          id: update.manifest?.id,
          createdAt:
            "createdAt" in update.manifest
              ? update.manifest.createdAt
              : "undefined",
        });
        showToast(
          "An update is available! Download and install to get the latest version.",
          "success"
        );
      } else {
        setUpdateInfo({
          isAvailable: false,
        });
        showToast("You are running the latest version.", "info");
      }
    } catch (error) {
      console.error("Error checking for updates:", error);
      showToast(`Failed to check for updates: ${error}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const fetch = async () => {
    setLoading(true);

    try {
      const { isNew } = await fetchUpdate();
      if (isNew) {
        setUpdateDownloaded(true);
        showToast(
          "Update downloaded successfully! Restart to apply changes.",
          "success"
        );
      }
    } catch (error) {
      console.error("Error fetching update:", error);
      showToast("Failed to download the update.", "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    updateInfo,
    loading,
    updateDownloaded,
    check,
    fetch,
    restart: restartApp,
  };
}

type InfoItemProps = {
  label: string;
  value: string;
  color?: string;
};

const InfoItem = ({ label, value, color }: InfoItemProps) => (
  <View style={styles.infoSection}>
    <ThemedText
      fontSize={theme.fontSize14}
      fontWeight="medium"
      color={theme.colors.black70}>
      {label}
    </ThemedText>
    <ThemedText fontSize={theme.fontSize16} style={styles.value} color={color}>
      {value}
    </ThemedText>
  </View>
);

export function UpdateManager({
  checkForUpdate,
  fetchUpdate,
  restartApp,
}: {
  checkForUpdate: () => Promise<Updates.UpdateCheckResult>;
  fetchUpdate: () => Promise<Updates.UpdateFetchResult>;
  restartApp: () => Promise<void>;
}) {
  const { updateInfo, loading, updateDownloaded, check, fetch, restart } =
    useUpdateManager({
      checkForUpdate,
      fetchUpdate,
      restartApp,
    });

  return (
    <TopInset>
      <ScrollView>
        <View style={styles.container}>
          <ThemedText
            fontSize={theme.fontSize24}
            fontWeight="bold"
            style={styles.title}>
            Update Manager
          </ThemedText>

          {updateInfo && (
            <>
              <InfoItem
                label="Update Status"
                value={
                  updateInfo.isAvailable
                    ? "Update available!"
                    : "You have the latest version."
                }
                color={updateInfo.isAvailable ? theme.colors.green : undefined}
              />

              {updateInfo.id && (
                <InfoItem
                  label="Update ID"
                  value={updateInfo.id}
                  color={undefined}
                />
              )}

              {updateInfo.createdAt && (
                <InfoItem
                  label="Created At"
                  value={updateInfo.createdAt}
                  color={undefined}
                />
              )}
            </>
          )}

          <View style={styles.buttonContainer}>
            <Button
              style={styles.actionButton}
              onPress={check}
              backgroundColor={theme.colors.black}
              pressedBackgroundColor={theme.colors.black70}>
              <View style={styles.buttonContent}>
                <Ionicons name="refresh" size={20} color={theme.colors.white} />
                <ThemedText
                  fontSize={theme.fontSize16}
                  fontWeight="medium"
                  color={theme.colors.white}>
                  {loading && !updateDownloaded
                    ? "Checking..."
                    : "Check for Updates"}
                </ThemedText>
              </View>
            </Button>

            {updateInfo?.isAvailable && !updateDownloaded && (
              <Button
                style={styles.actionButton}
                onPress={fetch}
                backgroundColor={theme.colors.green}
                pressedBackgroundColor={theme.colors.black70}>
                <View style={styles.buttonContent}>
                  <Ionicons
                    name="download"
                    size={20}
                    color={theme.colors.white}
                  />
                  <ThemedText
                    fontSize={theme.fontSize16}
                    fontWeight="medium"
                    color={theme.colors.white}>
                    {loading ? "Downloading..." : "Download"}
                  </ThemedText>
                </View>
              </Button>
            )}

            {updateDownloaded && (
              <Button
                style={styles.actionButton}
                onPress={restart}
                backgroundColor="#3498DB"
                pressedBackgroundColor={theme.colors.black70}>
                <View style={styles.buttonContent}>
                  <Ionicons
                    name="refresh-circle"
                    size={20}
                    color={theme.colors.white}
                  />
                  <ThemedText
                    fontSize={theme.fontSize16}
                    fontWeight="medium"
                    color={theme.colors.white}>
                    Restart App
                  </ThemedText>
                </View>
              </Button>
            )}
          </View>
        </View>
      </ScrollView>
    </TopInset>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.space16,
    flex: 1,
  },
  title: {
    marginBottom: theme.space16,
  },
  infoSection: {
    marginBottom: theme.space16,
  },
  value: {
    marginTop: theme.space4,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: theme.space8,
    marginVertical: theme.space16,
  },
  actionButton: {
    flex: 1,
    borderRadius: theme.borderRadius10,
    paddingVertical: theme.space12,
    paddingHorizontal: theme.space16,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.space8,
  },
});
