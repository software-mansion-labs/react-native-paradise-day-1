const { getDefaultConfig } = require("@expo/metro-config");
const { getSentryExpoConfig } = require("@sentry/react-native/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getSentryExpoConfig(__dirname, {
  getDefaultConfig,
  annotateReactComponents: true,
});

module.exports = config;
