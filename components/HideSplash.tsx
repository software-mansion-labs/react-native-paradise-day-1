import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export function HideSplash() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return null;
}
