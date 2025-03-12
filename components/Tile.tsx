import { theme } from "@/constants/theme";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { Image } from "expo-image";
import { Button } from "./Button";

export type TileProps = {
  title: string;
  image: number;
  onPress?: () => void;
};

export function Tile(props: TileProps) {
  const { title, image, onPress } = props;

  return (
    <Button style={styles.tileContainer} onPress={onPress}>
      <View style={styles.title}>
        <Image
          style={{
            width: "100%",
            height: "45%",
          }}
          source={image}
          contentFit="contain"
        />
        <ThemedText
          fontSize={theme.fontSize12}
          style={styles.tileText}
          fontWeight="medium">
          {title}
        </ThemedText>
      </View>
    </Button>
  );
}

const styles = StyleSheet.create({
  tileContainer: {
    flex: 1,
    aspectRatio: 1,
    maxHeight: theme.space24 * 3,
    borderRadius: theme.borderRadius10,
  },
  title: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tileText: {
    position: "absolute",
    bottom: theme.space4,
  },
});
