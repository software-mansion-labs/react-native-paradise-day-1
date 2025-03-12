import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useSignIn, useSSO } from "@clerk/clerk-expo";
import { TopInset } from "@/components/TopInsets";
import { Button } from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { theme } from "@/constants/theme";
import { Image } from "expo-image";
import { assets } from "@/constants/assets";
import { Ionicons } from "@expo/vector-icons";

import { notImplemented } from "@/utils/notImplemented";

export type SignInScreenProps = {
  navigateToHome?: () => void;
  navigateToSignUp?: () => void;
};

export function SignInScreen(props: SignInScreenProps) {
  const {
    navigateToHome = notImplemented(),
    navigateToSignUp = notImplemented(),
  } = props;

  const { startSSOFlow } = useSSO();
  const { signIn, setActive, isLoaded } = useSignIn();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameLogin = async () => {
    if (!isLoaded) return;

    setIsLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: username,
        password,
        strategy: "password",
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        navigateToHome();
      } else {
        Alert.alert("Error", "Please check your credentials and try again.");
      }
    } catch (err: any) {
      console.log(err);
      Alert.alert(
        "Error",
        err.errors?.[0]?.message || "An error occurred during sign in."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TopInset>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image
                source={assets.images.taxiCar}
                style={styles.logo}
                contentFit="contain"
              />
              <ThemedText fontSize={theme.fontSize32} fontWeight="bold">
                City Router
              </ThemedText>
              <ThemedText
                fontSize={theme.fontSize16}
                color={theme.colors.black60}
                style={styles.subtitle}>
                Get there with just a tap
              </ThemedText>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor={theme.colors.black60}
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  keyboardType="default"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor={theme.colors.black60}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
                <Button
                  style={styles.button}
                  backgroundColor={theme.colors.green}
                  pressedBackgroundColor={theme.colors.black70}
                  disabled={isLoading}
                  onPress={handleUsernameLogin}>
                  <View style={styles.buttonContent}>
                    <ThemedText
                      fontSize={theme.fontSize16}
                      fontWeight="bold"
                      color={theme.colors.white}>
                      {isLoading ? "Signing in..." : "Sign in"}
                    </ThemedText>
                  </View>
                </Button>

                <View style={styles.createAccountContainer}>
                  <ThemedText
                    fontSize={theme.fontSize14}
                    color={theme.colors.black60}>
                    Don't have an account?
                  </ThemedText>
                  <Button
                    style={[styles.button, styles.createAccountButton]}
                    backgroundColor={theme.colors.white}
                    pressedBackgroundColor={theme.colors.black4}
                    onPress={() => {
                      navigateToSignUp();
                    }}>
                    <View style={styles.buttonContent}>
                      <ThemedText
                        fontSize={theme.fontSize16}
                        fontWeight="bold"
                        color={theme.colors.black}>
                        Create Account
                      </ThemedText>
                    </View>
                  </Button>
                </View>
              </View>

              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <ThemedText
                  fontSize={theme.fontSize14}
                  color={theme.colors.black60}
                  style={styles.dividerText}>
                  or continue with
                </ThemedText>
                <View style={styles.divider} />
              </View>

              <View style={styles.socialButtonsContainer}>
                <Button
                  style={[styles.button, styles.googleButton]}
                  backgroundColor={theme.colors.white}
                  pressedBackgroundColor={theme.colors.black4}
                  onPress={() => startSSOFlow({ strategy: "oauth_google" })}>
                  <View style={styles.buttonContent}>
                    <Image
                      source={assets.images.google}
                      style={{
                        width: 24,
                        height: 24,
                      }}
                    />
                    <ThemedText
                      color={theme.colors.black}
                      fontSize={theme.fontSize16}
                      fontWeight="bold">
                      Google
                    </ThemedText>
                  </View>
                </Button>

                <Button
                  style={styles.button}
                  backgroundColor={theme.colors.black}
                  pressedBackgroundColor={theme.colors.black70}
                  onPress={() => startSSOFlow({ strategy: "oauth_apple" })}>
                  <View style={styles.buttonContent}>
                    <Ionicons
                      name="logo-apple"
                      size={24}
                      color={theme.colors.white}
                    />
                    <ThemedText
                      fontSize={theme.fontSize16}
                      fontWeight="bold"
                      color={theme.colors.white}>
                      Apple
                    </ThemedText>
                  </View>
                </Button>
              </View>
            </View>

            <View style={styles.footer}>
              <ThemedText
                fontSize={theme.fontSize12}
                color={theme.colors.black60}
                style={styles.footerText}>
                By continuing, you agree to our Terms of Service and acknowledge
                that you have read our Privacy Policy to learn how we collect,
                use, and share your data.
              </ThemedText>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TopInset>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.space24,
    justifyContent: "space-between",
    minHeight: "100%",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: theme.space24,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: theme.space16,
  },
  subtitle: {
    marginTop: theme.space8,
    textAlign: "center",
  },
  formContainer: {
    gap: theme.space24,
  },
  inputContainer: {
    gap: theme.space16,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.black10,
    borderRadius: theme.borderRadius10,
    padding: theme.space16,
    fontSize: theme.fontSize16,
    backgroundColor: theme.colors.white,
    color: theme.colors.black,
  },
  button: {
    padding: theme.space16,
    borderRadius: theme.borderRadius10,
    flex: 1,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.space12,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space8,
  },
  divider: {
    height: 1,
    flex: 1,
    backgroundColor: theme.colors.black10,
  },
  dividerText: {
    paddingHorizontal: theme.space8,
  },
  socialButtonsContainer: {
    gap: theme.space16,
  },
  googleButton: {
    borderWidth: 1,
    borderColor: theme.colors.black10,
  },
  footer: {
    marginTop: theme.space24,
  },
  footerText: {
    textAlign: "center",
  },
  createAccountContainer: {
    gap: theme.space8,
    marginTop: theme.space16,
  },
  createAccountButton: {
    borderWidth: 1,
    borderColor: theme.colors.black10,
    backgroundColor: theme.colors.white,
    padding: theme.space12,
  },
});
