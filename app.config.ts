import { ExpoConfig, ConfigContext } from "expo/config";
import paradise from "./paradise.json";

const owner = paradise.owner ? paradise.owner : undefined;
const projectId = paradise.projectId ? paradise.projectId : undefined;

const fonts = ["Bold", "Light", "Medium", "Regular"].map(
  (font) => `./assets/fonts/Roboto-${font}.ttf`
);

const environment = process.env.EXPO_PUBLIC_ENV as
  | "development"
  | "preview"
  | "production";

const slug = "city-router";

function getAppName() {
  const name = "CityRouter";

  // TODO(multiple-app-environments): Change app name for each environment
  switch (environment) {
    case "development":
      return `${name} Dev`;
    case "preview":
      return `${name} Preview`;
    default:
      return name;
  }
}

function getScheme() {
  const scheme = "city-router";

  // TODO(multiple-app-environments): Change scheme for each environment
  switch (environment) {
    case "development":
      return `${scheme}-dev`;
    case "preview":
      return `${scheme}-preview`;
    default:
      return scheme;
  }
}

function getUniqueIdentifier() {
  const bundleIdentifier = "com.paradise.cityrouter";

  // TODO(multiple-app-environments): Change bundle identifier for each environment
  switch (environment) {
    case "development":
      return `${bundleIdentifier}.dev`;
    case "preview":
      return `${bundleIdentifier}.preview`;
    default:
      return bundleIdentifier;
  }
}

function getIcon(platform: "ios" | "android") {
  // TODO(multiple-app-environments): Change icon for each environment
  return `./assets/app-icons/${platform}/${environment}-icon.png`;
}

const uniqueIdentifier = getUniqueIdentifier();

export default ({ config }: ConfigContext): ExpoConfig => ({
  name: getAppName(),
  slug,
  scheme: getScheme(),
  version: "1.0.0",
  orientation: "portrait",
  newArchEnabled: true,
  owner,
  ios: {
    bundleIdentifier: uniqueIdentifier,
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
    icon: getIcon("ios"),
  },
  android: {
    package: uniqueIdentifier,
    adaptiveIcon: {
      foregroundImage: getIcon("android"),
      backgroundImage: "./assets/app-icons/android/icon-background.png",
    },
    backgroundColor: "#ffffff",
  },
  web: {
    favicon: "./assets/favicon.png",
    bundler: "metro",
    output: "server",
  },
  plugins: [
    [
      "expo-router",
      {
        origin: "https://api.city-router.app",
      },
    ],
    [
      "expo-font",
      {
        fonts,
      },
    ],
    [
      "@sentry/react-native/expo",
      {
        url: "https://sentry.io/",
        project: "react-native",
        organization: "rn-paradise",
        experimental_android: {
          enableAndroidGradlePlugin: true,
          autoUploadProguardMapping: true,
          uploadNativeSymbols: true,
          includeNativeSources: true,
          includeSourceContext: true,
        },
      },
    ],
    [
      "react-native-edge-to-edge",
      {
        android: {
          parentTheme: "Light",
        },
      },
    ],
    [
      "expo-splash-screen",
      {
        backgroundColor: "#ffffff",
        image: "./assets/app-icons/splash.png",
        dark: {
          backgroundColor: "#ffffff",
          image: "./assets/app-icons/splash.png",
        },
        resizeMode: "cover",
      },
    ],
    "expo-background-task",
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: `https://api.${slug}.app`,
    },
    eas: {
      projectId,
    },
  },
  updates: {
    url: projectId ? `https://u.expo.dev/${projectId}` : undefined,
  },
  runtimeVersion: {
    policy: "appVersion",
  },
});
