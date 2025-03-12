import React from "react";
import { View, StyleSheet, Platform, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useUser } from "@clerk/clerk-expo";
import { theme } from "@/constants/theme";
import { Button } from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";

import { formatShortDate } from "@/utils/formatters";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { notImplemented } from "@/utils/notImplemented";

function SheetHeader() {
  const insets = useSafeAreaInsets();

  if (Platform.OS === "ios") {
    return <View style={{ marginTop: theme.space24 }} />;
  }

  return (
    <View>
      <Button
        onPress={() => router.back()}
        backgroundColor={theme.colors.white}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: theme.space8,
          paddingHorizontal: theme.space16,
          paddingVertical: theme.space12,
          marginTop: insets.top,
        }}>
        <Ionicons name="arrow-back" size={20} color={theme.colors.black} />
        <ThemedText fontSize={theme.fontSize14} fontWeight="bold">
          Back
        </ThemedText>
      </Button>
    </View>
  );
}

export type UserScreenProps = {
  signOut?: () => void;
};

export function UserScreen(props: UserScreenProps) {
  const { signOut = notImplemented() } = props;
  const { user } = useUser();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container} collapsable={false}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic">
        <SheetHeader />
        <View style={styles.content}>
          <View style={styles.profileContainer}>
            {user?.imageUrl ? (
              <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
            ) : (
              <View style={styles.placeholderAvatar}>
                <Ionicons
                  name="person"
                  size={28}
                  color={theme.colors.black60}
                />
              </View>
            )}

            <ThemedText
              fontSize={theme.fontSize18}
              fontWeight="bold"
              style={styles.username}>
              {user?.username || "No username"}
            </ThemedText>

            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color={theme.colors.black} />
              <ThemedText
                fontSize={theme.fontSize14}
                style={{ marginLeft: theme.space4 }}>
                5.0
              </ThemedText>
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText
              fontSize={theme.fontSize14}
              fontWeight="medium"
              style={styles.sectionTitle}>
              Account
            </ThemedText>

            <View style={styles.listItem}>
              <Ionicons
                name="mail-outline"
                size={16}
                color={theme.colors.black}
              />
              <View style={styles.listItemContent}>
                <ThemedText
                  fontSize={theme.fontSize12}
                  color={theme.colors.black60}>
                  Email
                </ThemedText>
                <ThemedText fontSize={theme.fontSize14}>
                  {user?.emailAddresses?.[0]?.emailAddress || "No email"}
                </ThemedText>
              </View>
            </View>

            <View style={styles.listItem}>
              <Ionicons
                name="calendar-outline"
                size={16}
                color={theme.colors.black}
              />
              <View style={styles.listItemContent}>
                <ThemedText
                  fontSize={theme.fontSize12}
                  color={theme.colors.black60}>
                  Member since
                </ThemedText>
                <ThemedText fontSize={theme.fontSize14}>
                  {formatShortDate(user?.createdAt)}
                </ThemedText>
              </View>
            </View>

            <View style={styles.listItem}>
              <Ionicons
                name="shield-checkmark-outline"
                size={16}
                color={theme.colors.black}
              />
              <View style={styles.listItemContent}>
                <ThemedText
                  fontSize={theme.fontSize12}
                  color={theme.colors.black60}>
                  Status
                </ThemedText>
                <ThemedText fontSize={theme.fontSize14}>
                  Verified account
                </ThemedText>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText
              fontSize={theme.fontSize14}
              fontWeight="medium"
              style={styles.sectionTitle}>
              Quick Access
            </ThemedText>

            <View style={styles.actionsGrid}>
              {[
                { icon: "car-outline" as const, label: "My Rides" },
                { icon: "heart-outline" as const, label: "Favorites" },
                { icon: "card-outline" as const, label: "Payment" },
                { icon: "settings-outline" as const, label: "Settings" },
              ].map((item, index) => (
                <View key={index} style={styles.actionItem}>
                  <View style={styles.actionIcon}>
                    <Ionicons
                      name={item.icon}
                      size={18}
                      color={theme.colors.black}
                    />
                  </View>
                  <ThemedText
                    fontSize={theme.fontSize12}
                    style={styles.actionLabel}>
                    {item.label}
                  </ThemedText>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.buttonSection}>
            <Button
              style={styles.primaryButton}
              backgroundColor={theme.colors.black}
              pressedBackgroundColor={theme.colors.black70}>
              <ThemedText
                color={theme.colors.white}
                fontSize={theme.fontSize16}
                fontWeight="medium">
                Edit Profile
              </ThemedText>
            </Button>

            <Button
              onPress={() => signOut()}
              style={styles.secondaryButton}
              backgroundColor={theme.colors.white}
              pressedBackgroundColor={theme.colors.black4}>
              <ThemedText
                fontSize={theme.fontSize16}
                fontWeight="medium"
                color={theme.colors.black}>
                Sign Out
              </ThemedText>
            </Button>
          </View>

          <View
            style={{
              height: insets.bottom + theme.space24 * 2,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: Platform.select({ default: 1, android: 0 }),
    ...Platform.select({
      default: {},
      android: {
        width: "100%",
        height: "100%",
      },
    }),
  },
  content: {
    padding: theme.space16,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.black4,
    marginBottom: theme.space8,
  },
  placeholderAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.black4,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.space8,
  },
  username: {
    marginBottom: theme.space4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: theme.space8,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.space8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.black4,
  },
  listItemContent: {
    marginLeft: theme.space12,
    flex: 1,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -theme.space4,
  },
  actionItem: {
    width: "25%",
    padding: theme.space4,
    alignItems: "center",
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.space8,
    backgroundColor: theme.colors.black4,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.space4,
  },
  actionLabel: {
    color: theme.colors.black,
    textAlign: "center",
  },
  buttonSection: {
    gap: theme.space8,
  },
  primaryButton: {
    paddingVertical: theme.space12,
    borderRadius: theme.space8,
    alignItems: "center",
  },
  secondaryButton: {
    paddingVertical: theme.space12,
    borderRadius: theme.space8,
    borderWidth: 1,
    borderColor: theme.colors.black10,
    alignItems: "center",
  },
});
