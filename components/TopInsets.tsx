import { View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function TopInset(props: React.ComponentProps<typeof View>) {
  const insets = useSafeAreaInsets();
  const { style, ...otherProps } = props;
  return (
    <View
      style={[style, { flex: 1, paddingTop: insets.top }]}
      {...otherProps}
    />
  );
}
