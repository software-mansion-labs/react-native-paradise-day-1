import { theme } from "@/constants/theme";
import React from "react";
import {
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from "react-native";

type ButtonProps = React.ComponentProps<typeof Pressable> & {
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  pressedBackgroundColor?: string;
};
export function Button(props: ButtonProps) {
  const {
    style,
    backgroundColor = theme.colors.black4,
    pressedBackgroundColor = theme.colors.black30,
    ...rest
  } = props;
  const pressableStyle = React.useCallback(
    ({ pressed }: PressableStateCallbackType) => {
      return [
        {
          backgroundColor: pressed ? pressedBackgroundColor : backgroundColor,
        },
        style,
      ];
    },
    [style, backgroundColor, pressedBackgroundColor]
  );
  return <Pressable style={pressableStyle} {...rest} />;
}
