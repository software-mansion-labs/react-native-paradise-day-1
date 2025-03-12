import { theme } from "@/constants/theme";
import { View } from "react-native";
import { Image } from "expo-image";
import { ThemedText } from "./ThemedText";
import { assets } from "@/constants/assets";

export function TopBarLabel({
  image,
  children,
}: {
  image: number;
  children: string;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: theme.space8,
      }}>
      <Image
        source={image}
        style={{
          width: theme.fontSize18 * 2,
          height: "100%",
        }}
        contentFit="contain"
      />
      <ThemedText fontSize={theme.fontSize18} fontWeight="bold">
        {children}
      </ThemedText>
    </View>
  );
}

export function RidesTopBarLabel(props: { children: string }) {
  return <TopBarLabel {...props} image={assets.images.car} />;
}

export function EatsTopBarLabel(props: { children: string }) {
  return <TopBarLabel {...props} image={assets.images.burger} />;
}
