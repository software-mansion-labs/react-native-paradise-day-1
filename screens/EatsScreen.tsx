import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { CSSAnimationKeyframes } from "react-native-reanimated";
import { Image } from "expo-image";
import { assets } from "@/constants/assets";
import { theme } from "@/constants/theme";

const pulse: CSSAnimationKeyframes = {
  "0%": {
    transform: [{ translateY: 0 }],
  },
  "50%": {
    transform: [{ translateY: -25 }],
  },
  "100%": {
    transform: [{ translateY: 0 }],
  },
};

function BouncingImage(props: { animationDelay?: string; image: number }) {
  return (
    <Animated.View
      style={[
        styles.box,
        // @ts-ignore
        {
          animationName: pulse,
          animationDuration: "1.5s",
          animationIterationCount: "infinite",
          animationTimingFunction: "ease-in-out",
          animationDirection: "alternate",
          animationDelay: props.animationDelay,
        },
      ]}>
      <Image
        style={{
          height: "100%",
          width: "100%",
        }}
        contentFit="contain"
        source={props.image}
      />
    </Animated.View>
  );
}

export function EatsScreen() {
  return (
    <View style={styles.container}>
      <BouncingImage image={assets.images.restaurants} />
      <BouncingImage image={assets.images.grocery} animationDelay="0.25s" />
      <BouncingImage image={assets.images.cocktail} animationDelay="0.5s" />
      <BouncingImage image={assets.images.flowers} animationDelay="0.75s" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.space16,
  },
  box: {
    height: theme.space16 * 4,
    width: theme.space16 * 4,
  },
});
