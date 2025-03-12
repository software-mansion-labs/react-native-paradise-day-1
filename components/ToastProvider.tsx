import React from "react";
import { theme } from "@/constants/theme";
import { View } from "react-native";

import Toast, { ToastConfig } from "react-native-toast-message";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";

const toastConfig: ToastConfig = {
  success: ({ text1, text2 }) => (
    <View
      style={{
        width: "90%",
        backgroundColor: "rgba(59, 134, 78, 0.95)",
        padding: theme.space16,
        borderRadius: theme.borderRadius10,
        flexDirection: "row",
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      }}>
      <Ionicons
        name="checkmark-circle"
        size={24}
        color={theme.colors.white}
        style={{ marginRight: theme.space8 }}
      />
      <View style={{ flex: 1 }}>
        <ThemedText
          fontSize={theme.fontSize16}
          fontWeight="bold"
          color={theme.colors.white}>
          {text1}
        </ThemedText>
        {text2 && (
          <ThemedText
            fontSize={theme.fontSize14}
            color={theme.colors.white}
            style={{ marginTop: theme.space4, opacity: 0.9 }}>
            {text2}
          </ThemedText>
        )}
      </View>
    </View>
  ),
  error: ({ text1, text2 }) => (
    <View
      style={{
        width: "90%",
        backgroundColor: "rgba(231, 76, 60, 0.95)",
        padding: theme.space16,
        borderRadius: theme.borderRadius10,
        flexDirection: "row",
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      }}>
      <Ionicons
        name="alert-circle"
        size={24}
        color={theme.colors.white}
        style={{ marginRight: theme.space8 }}
      />
      <View style={{ flex: 1 }}>
        <ThemedText
          fontSize={theme.fontSize16}
          fontWeight="bold"
          color={theme.colors.white}>
          {text1}
        </ThemedText>
        {text2 && (
          <ThemedText
            fontSize={theme.fontSize14}
            color={theme.colors.white}
            style={{ marginTop: theme.space4, opacity: 0.9 }}>
            {text2}
          </ThemedText>
        )}
      </View>
    </View>
  ),
  info: ({ text1, text2 }) => (
    <View
      style={{
        width: "90%",
        backgroundColor: "rgba(52, 152, 219, 0.95)",
        padding: theme.space16,
        borderRadius: theme.borderRadius10,
        flexDirection: "row",
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      }}>
      <Ionicons
        name="information-circle"
        size={24}
        color={theme.colors.white}
        style={{ marginRight: theme.space8 }}
      />
      <View style={{ flex: 1 }}>
        <ThemedText
          fontSize={theme.fontSize16}
          fontWeight="bold"
          color={theme.colors.white}>
          {text1}
        </ThemedText>
        {text2 && (
          <ThemedText
            fontSize={theme.fontSize14}
            color={theme.colors.white}
            style={{ marginTop: theme.space4, opacity: 0.9 }}>
            {text2}
          </ThemedText>
        )}
      </View>
    </View>
  ),
};

export function ToastProvider() {
  return <Toast config={toastConfig} />;
}
