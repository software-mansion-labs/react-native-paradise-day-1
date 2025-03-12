import { theme } from "./theme";

const screenOptions = {
  freezeOnBlur: true,
  headerShown: false,
};

export const defaults = {
  screenOptions,

  navigation: {
    authStack: {
      ...screenOptions,
      animation: "none",
    },

    protectedStack: {
      ...screenOptions,
    },

    mainStack: {
      ...screenOptions,
    },

    tabs: {
      ...screenOptions,
      tabBarActiveTintColor: theme.colors.black,
    },

    topTabs: {
      ...screenOptions,
      tabBarIndicatorStyle: {
        backgroundColor: theme.colors.black,
        height: theme.space4,
      },
      sceneStyle: {
        backgroundColor: theme.colors.white,
      },
      swipeEnabled: false,
    },
  },
} as const;
