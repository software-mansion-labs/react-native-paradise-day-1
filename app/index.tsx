import { View } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { Image } from "expo-image";
import { assets } from "@/constants/assets";
export default function index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={assets.images.taxiCar}
        style={{ width: 200, height: 200 }}
      />
      <ThemedText fontSize={24} fontWeight="bold">
        👋 React Native Paradise
      </ThemedText>
    </View>
  );
}
