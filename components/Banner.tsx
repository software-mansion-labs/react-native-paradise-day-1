import { theme } from "@/constants/theme";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { Image } from "expo-image";
import { Button } from "./Button";

export type BannerProps = {
  title: string;
  text: string;
  image: number;
  onPress?: () => void;
};

export function Banner(props: BannerProps) {
  const { title, text, image, onPress = () => {} } = props;

  return (
    <Button style={styles.bannerTouchable} onPress={onPress}>
      <View style={styles.bannerTextContainer}>
        <ThemedText fontSize={theme.fontSize14} fontWeight="medium">
          {title}
        </ThemedText>
        <ThemedText fontSize={theme.fontSize12} fontWeight="light">
          {text}
        </ThemedText>
      </View>
      <View style={styles.bannerImageContainer}>
        <Image style={styles.bannerImage} source={image} contentFit="contain" />
      </View>
    </Button>
  );
}

const styles = StyleSheet.create({
  bannerTouchable: {
    flex: 1,
    flexDirection: "row",
    borderRadius: theme.borderRadius10,
    height: theme.space10 * 9,
    alignItems: "center",
  },
  bannerTextContainer: {
    flexDirection: "column",
    gap: theme.space8,
    padding: theme.space16,
  },

  bannerImageContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: theme.space16,
  },
  bannerImage: {
    height: theme.space12 * 5,
    width: theme.space12 * 5,
  },
});
