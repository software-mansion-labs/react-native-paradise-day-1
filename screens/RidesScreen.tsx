import { View, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import Map from "@/components/Map";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { MapBottomSheet, BackButton } from "@/components/MapBottomSheet";
import { Image } from "expo-image";
import { notImplemented } from "@/utils/notImplemented";

const AnimatedImage = Animated.createAnimatedComponent(Image);

export type RidesScreenProps = {
  navigateToHome?: () => void;
};

export function RidesScreen(props: RidesScreenProps) {
  const { navigateToHome = notImplemented() } = props;

  const sheetState = useSharedValue(-1);

  const opacity = useSharedValue(1);

  const onMapReady = useCallback(() => {
    opacity.value = withTiming(0, { duration: 300 });
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      display: opacity.value === 0 ? "none" : "flex",
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <BackButton sheetState={sheetState} onPress={navigateToHome} />
      <AnimatedImage
        source={{
          blurhash: "L6Q0jjxcr_$g}jWUNxNbR#sW$JJ5",
          // blurhash: "LNAnWJS500xBtRa#RjoI00oI_NR:",
        }}
        style={[
          {
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
          },
          animatedStyle,
        ]}
      />

      <Map
        onMapReady={onMapReady}
        dom={{
          scrollEnabled: false,
          contentInsetAdjustmentBehavior: "never",
          bounces: false,
        }}
      />

      <MapBottomSheet sheetState={sheetState} onBackPress={navigateToHome} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
