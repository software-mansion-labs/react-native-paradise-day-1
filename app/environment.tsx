import { View, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { TopInset } from "@/components/TopInsets";
import { ThemedText } from "@/components/ThemedText";
import { theme } from "@/constants/theme";
import { HideSplash } from "@/components/HideSplash";

export default function Environment() {
  const envVars = Object.entries(process.env).sort(([a], [b]) =>
    a.localeCompare(b)
  );
  const expoPublicEnv = process.env.EXPO_PUBLIC_ENV || "Not set";

  return (
    <TopInset style={styles.container}>
      <HideSplash />
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerContainer}>
          <ThemedText
            style={styles.header}
            fontSize={theme.fontSize24}
            fontWeight="bold">
            System Information
          </ThemedText>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionItem}>
            <ThemedText
              fontSize={theme.fontSize16}
              fontWeight="bold"
              color={theme.colors.black}>
              Development Mode
            </ThemedText>
            <ThemedText
              fontSize={theme.fontSize14}
              color={__DEV__ ? theme.colors.green : theme.colors.black60}
              fontWeight={__DEV__ ? "bold" : "regular"}>
              {__DEV__ ? "Enabled" : "Disabled"}
            </ThemedText>
          </View>
        </View>

        <ThemedText
          style={styles.header}
          fontSize={theme.fontSize24}
          fontWeight="bold">
          Environment Variables
        </ThemedText>

        <View style={styles.section}>
          <View style={styles.sectionItem}>
            <ThemedText
              fontSize={theme.fontSize16}
              fontWeight="bold"
              color={theme.colors.black}>
              EXPO_PUBLIC_ENV
            </ThemedText>
            <ThemedText
              fontSize={theme.fontSize14}
              color={
                expoPublicEnv !== "Not set"
                  ? theme.colors.green
                  : theme.colors.black60
              }
              fontWeight={expoPublicEnv !== "Not set" ? "bold" : "regular"}>
              {expoPublicEnv}
            </ThemedText>
          </View>

          {envVars.map(([key, value]) => (
            <View key={key} style={styles.sectionItem}>
              <ThemedText
                fontSize={theme.fontSize16}
                fontWeight="bold"
                color={theme.colors.black}>
                {key}
              </ThemedText>
              <ThemedText
                fontSize={theme.fontSize14}
                color={theme.colors.black60}>
                {value}
              </ThemedText>
            </View>
          ))}
        </View>
      </ScrollView>
    </TopInset>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  headerContainer: {
    paddingTop: 16,
  },
  header: {
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: theme.colors.black4,
    borderRadius: theme.borderRadius10,
    marginBottom: 24,
    overflow: "hidden",
  },
  sectionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.black10,
  },
});
