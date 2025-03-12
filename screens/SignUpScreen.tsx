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
import { useSignUp } from "@clerk/clerk-expo";
import { TopInset } from "@/components/TopInsets";
import { Button } from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { theme } from "@/constants/theme";
import { Image } from "expo-image";
import { assets } from "@/constants/assets";
import { notImplemented } from "@/utils/notImplemented";

export type SignUpScreenProps = {
  navigateToHome?: () => void;
  navigateToSignIn?: () => void;
};

export function SignUpScreen(props: SignUpScreenProps) {
  const { signUp, setActive, isLoaded } = useSignUp();
  const {
    navigateToHome = notImplemented(),
    navigateToSignIn = notImplemented(),
  } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (!isLoaded) return;

    setIsLoading(true);
    try {
      const signUpAttempt = await signUp.create({
        username,
        password,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        navigateToHome();
      } else {
        Alert.alert("Error", "Please check your input and try again.");
      }
    } catch (err: any) {
      console.log(err);
      Alert.alert(
        "Error",
        err.errors?.[0]?.message || "An error occurred during sign up."
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
                Create Account
              </ThemedText>
              <ThemedText
                fontSize={theme.fontSize16}
                color={theme.colors.black60}
                style={styles.subtitle}>
                Join us and start your journey
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
                  onPress={handleSignUp}>
                  <View style={styles.buttonContent}>
                    <ThemedText
                      fontSize={theme.fontSize16}
                      fontWeight="bold"
                      color={theme.colors.white}>
                      {isLoading ? "Creating account..." : "Create Account"}
                    </ThemedText>
                  </View>
                </Button>

                <View style={styles.loginContainer}>
                  <ThemedText
                    fontSize={theme.fontSize14}
                    color={theme.colors.black60}>
                    Already have an account?
                  </ThemedText>
                  <Button
                    style={[styles.button, styles.loginButton]}
                    backgroundColor={theme.colors.white}
                    pressedBackgroundColor={theme.colors.black4}
                    onPress={() => {
                      navigateToSignIn();
                    }}>
                    <View style={styles.buttonContent}>
                      <ThemedText
                        fontSize={theme.fontSize16}
                        fontWeight="bold"
                        color={theme.colors.black}>
                        Sign In
                      </ThemedText>
                    </View>
                  </Button>
                </View>
              </View>
            </View>

            <View style={styles.footer}>
              <ThemedText
                fontSize={theme.fontSize12}
                color={theme.colors.black60}
                style={styles.footerText}>
                By creating an account, you agree to our Terms of Service and
                acknowledge that you have read our Privacy Policy to learn how
                we collect, use, and share your data.
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
    marginTop: theme.space24,
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
  footer: {
    marginTop: theme.space24,
  },
  footerText: {
    textAlign: "center",
  },
  loginContainer: {
    gap: theme.space8,
    marginTop: theme.space16,
  },
  loginButton: {
    borderWidth: 1,
    borderColor: theme.colors.black10,
    backgroundColor: theme.colors.white,
    padding: theme.space12,
  },
});
