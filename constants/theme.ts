import { DefaultTheme } from "@react-navigation/native";

const baseTheme = {
  colors: {
    black: "#000000",
    black70: "#545454",
    black60: "#6B6B6B",
    black30: "#AFAFAF",
    black10: "#E2E2E2",
    black4: "#EEEEEE",
    white: "#FFFFFF",
    green: "#3B864E",
  },

  space4: 4,
  space8: 8,
  space10: 10,
  space12: 12,
  space16: 16,
  space24: 24,

  fontSize10: 10,
  fontSize12: 12,
  fontSize14: 14,
  fontSize16: 16,
  fontSize18: 18,
  fontSize24: 24,
  fontSize32: 32,

  fonts: {
    light: "Roboto-Light",
    regular: "Roboto-Regular",
    medium: "Roboto-Medium",
    bold: "Roboto-Bold",
  },

  borderRadius10: 10,
  borderRadius20: 20,
  borderRadiusFull: 9999,

  shadows: {
    small: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
  },
};

export const theme = {
  ...baseTheme,
  navigationTheme: {
    ...DefaultTheme,
    colors: {
      primary: baseTheme.colors.green,
      background: baseTheme.colors.white,
      card: baseTheme.colors.white,
      text: baseTheme.colors.black,
      border: baseTheme.colors.black4,
      notification: baseTheme.colors.green,
    },
  },
};

export type FontSizeToken = "10" | "12" | "14" | "16" | "18" | "24" | "32";
export type FontSize = `fontSize${FontSizeToken}`;
