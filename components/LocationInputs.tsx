import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/constants/theme";

function IconWithInner({
  name,
  size = 20,
}: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  size?: number;
}) {
  return (
    <View>
      <Ionicons name={name} size={size} />
      <Ionicons
        name={name}
        size={6}
        color={theme.colors.white}
        style={styles.innerIcon}
      />
    </View>
  );
}

export function LocationInputs() {
  return (
    <View style={styles.locationInputsContainer}>
      <View style={styles.locationIconsContainer}>
        <IconWithInner name="ellipse" />
        <Ionicons name="remove" size={20} style={styles.verticalLine} />
        <IconWithInner name="square" />
      </View>

      <View style={styles.textInputsContainer}>
        <TextInput
          style={styles.pickupInput}
          placeholder="Enter pickup location"
          placeholderTextColor={theme.colors.black60}
        />
        <TextInput
          style={styles.destinationInput}
          placeholder="Where to?"
          placeholderTextColor={theme.colors.black60}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  locationInputsContainer: {
    flex: 1,
    borderWidth: 3,
    borderColor: theme.colors.black,
    borderRadius: theme.borderRadius10,
    flexDirection: "row",
  },
  locationIconsContainer: {
    flexDirection: "column",
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  innerIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateY: -3 }, { translateX: -3 }],
  },
  verticalLine: {
    marginVertical: -2,
    transform: [{ rotate: "90deg" }],
  },
  textInputsContainer: {
    flex: 1,
  },
  pickupInput: {
    fontSize: theme.fontSize12,
    paddingVertical: 10,
    borderBottomColor: theme.colors.black4,
    borderBottomWidth: 1,
  },
  destinationInput: {
    fontSize: theme.fontSize12,
    paddingVertical: 10,
  },
});
