import { StyleSheet, View } from "react-native";
import React from "react";
import { theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "./ThemedText";
import { Badge } from "./Badge";
import { Button } from "./Button";

export type ProfileHeaderProps = {
  userName: string;
  rating: number;
  onPress?: () => void;
};

export function ProfileHeader(props: ProfileHeaderProps) {
  const { userName, rating, onPress } = props;

  return (
    <View style={styles.header}>
      <View style={styles.headerTextGroup}>
        <View>
          <ThemedText fontSize={theme.fontSize32} fontWeight="bold">
            {userName}
          </ThemedText>
        </View>

        <Badge
          icon="star"
          text={rating.toFixed(1)}
          iconSize="12"
          textSize="12"
          backgroundColor={theme.colors.black4}
        />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-end",
        }}>
        <Button
          style={styles.iconContainer}
          onPress={onPress}
          disabled={!onPress}>
          <Ionicons name="person" size={32} color={theme.colors.black60} />
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
  },
  headerTextGroup: {
    flexDirection: "column",
    justifyContent: "space-around",
    gap: theme.space8,
  },
  iconContainer: {
    borderRadius: theme.borderRadiusFull,
    height: theme.space16 * 4,
    width: theme.space16 * 4,
    justifyContent: "center",
    alignItems: "center",
  },
  rateBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    columnGap: theme.space4,
    backgroundColor: theme.colors.black4,
    paddingVertical: theme.space4 / 2,
    paddingHorizontal: theme.space4,
    borderRadius: theme.borderRadius10 / 2,
  },
});
