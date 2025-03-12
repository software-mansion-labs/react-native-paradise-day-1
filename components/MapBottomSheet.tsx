import React, { useRef, useCallback } from "react";
import { View, StyleSheet, Platform } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { theme } from "@/constants/theme";
import { SearchBar } from "@/components/SearchBar";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { Badge } from "@/components/Badge";
import { IconButton } from "@/components/IconButton";
import { Divider } from "@/components/Divider";
import { Button } from "@/components/Button";
import { LocationInputs } from "@/components/LocationInputs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const BOTTOM_SHEET_SWITCH_INDEX = 0.4;
export const BOTTOM_SHEET_BACK_BUTTON_INDEX = 0.8;

function CollapsedContent({
  extend,
  sheetIndex,
}: {
  extend: () => void;
  sheetIndex: SharedValue<number>;
}) {
  const animatedStyles = useAnimatedStyle(() => {
    if (sheetIndex.value < 0) return { display: "none" };
    return {
      display: sheetIndex.value >= BOTTOM_SHEET_SWITCH_INDEX ? "none" : "flex",
    };
  });

  return (
    <Animated.View style={animatedStyles}>
      <View style={styles.collapsedHeaderContainer}>
        <ThemedText fontSize={theme.fontSize18} fontWeight="medium">
          Set your pickup spot
        </ThemedText>
      </View>
      <View style={styles.searchBarContainer}>
        <SearchBar
          placeholder="Search"
          showLaterButton={false}
          onPress={extend}
        />
      </View>
    </Animated.View>
  );
}

function LocationOptions() {
  const options = [
    { title: "Search in a diffrent city", icon: "earth" as const },
    { title: "Set location on map", icon: "location" as const },
    { title: "Saved places", icon: "star" as const },
  ];

  return (
    <View style={styles.locationOptionsContainer}>
      {options.map((option, index) => (
        <React.Fragment key={option.title}>
          <IconButton
            titleSize="12"
            iconSize="12"
            title={option.title}
            icon={option.icon}
            iconStyle={styles.icon}
            buttonStyle={styles.iconTouchable}
          />
          {index < options.length - 1 && <Divider width="thin" />}
        </React.Fragment>
      ))}
    </View>
  );
}

function ExpandedContent({
  sheetIndex,
  onPress,
}: {
  sheetIndex: SharedValue<number>;
  onPress?: () => void;
}) {
  const animatedStyles = useAnimatedStyle(() => {
    if (sheetIndex.value < 0) {
      return {
        display: "flex",
      };
    }

    return {
      display: sheetIndex.value >= BOTTOM_SHEET_SWITCH_INDEX ? "flex" : "none",
    };
  });

  return (
    <Animated.View style={animatedStyles}>
      <View style={styles.expandedHeaderContainer}>
        <Button
          backgroundColor={theme.colors.white}
          pressedBackgroundColor={theme.colors.black4}
          style={styles.backButton}
          onPress={onPress}>
          <Ionicons name="arrow-back" size={theme.fontSize24} />
        </Button>

        <ThemedText fontSize={theme.fontSize18} fontWeight="medium">
          Plan your ride
        </ThemedText>
      </View>

      <View style={styles.badgesContainer}>
        <Badge
          text="Pickup now"
          icon="time"
          textSize="12"
          iconSize="12"
          showCaret
          backgroundColor={theme.colors.black4}
        />

        <Badge
          text="For me"
          icon="person"
          textSize="12"
          iconSize="12"
          showCaret
          backgroundColor={theme.colors.black4}
        />
      </View>

      <View style={styles.locationInputsRow}>
        <LocationInputs />
        <View style={styles.addButtonContainer}>
          <Ionicons
            name="add"
            size={theme.fontSize24}
            style={styles.addButton}
          />
        </View>
      </View>

      <LocationOptions />
    </Animated.View>
  );
}

export function MapBottomSheet({
  sheetState,
  onBackPress,
}: {
  sheetState: SharedValue<number>;

  onBackPress: () => void;
}) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const onSearchPress = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(1);
  }, [bottomSheetRef]);

  return (
    <BottomSheet
      index={1}
      ref={bottomSheetRef}
      animatedIndex={sheetState}
      {...Platform.select({
        android: {
          animationConfigs: {
            duration: 500,
          },
        },
        default: {},
      })}
      enableOverDrag={false}
      snapPoints={["20%", "90%"]}
      containerStyle={{ zIndex: 9999 }}>
      <BottomSheetView style={styles.bottomSheetContainer}>
        <CollapsedContent extend={onSearchPress} sheetIndex={sheetState} />
        <ExpandedContent sheetIndex={sheetState} onPress={onBackPress} />
      </BottomSheetView>
    </BottomSheet>
  );
}

export function BackButton({
  sheetState,
  onPress,
}: {
  sheetState: SharedValue<number>;
  onPress?: () => void;
}) {
  const insets = useSafeAreaInsets();

  const animatedStyles = useAnimatedStyle(() => {
    if (sheetState.value < 0) {
      return {
        display: "flex",
      };
    }

    return {
      display:
        sheetState.value < BOTTOM_SHEET_BACK_BUTTON_INDEX ? "flex" : "none",
      opacity: interpolate(
        sheetState.value,
        [0, BOTTOM_SHEET_BACK_BUTTON_INDEX],
        [1, 0]
      ),
    };
  });

  return (
    <Animated.View
      style={[styles.fabContainer, { top: insets.top }, animatedStyles]}>
      <Button
        backgroundColor={theme.colors.white}
        pressedBackgroundColor={theme.colors.black4}
        style={styles.fabButton}
        onPress={onPress}>
        <Ionicons name="arrow-back" size={theme.fontSize24} />
      </Button>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.white,
  },
  collapsedHeaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: theme.space16,
  },
  searchBarContainer: {
    paddingHorizontal: theme.space16,
  },
  expandedHeaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: theme.space16,
  },
  backButton: {
    position: "absolute",
    left: 0,
    borderRadius: theme.borderRadius10,
    overflow: "hidden",
    padding: theme.space16,
  },
  badgesContainer: {
    flexDirection: "row",
    gap: theme.space8,
    marginVertical: theme.space12,
    paddingHorizontal: theme.space16,
  },
  locationInputsRow: {
    paddingHorizontal: theme.space16,
    flexDirection: "row",
    gap: theme.space16,
  },
  addButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: theme.colors.black4,
    padding: theme.space8,
    borderRadius: theme.borderRadiusFull,
  },
  locationOptionsContainer: {
    marginTop: theme.space8,
  },
  fabContainer: {
    position: "absolute",
    left: theme.space12,
    zIndex: 999,
  },
  fabButton: {
    borderRadius: theme.borderRadiusFull,
    padding: theme.space12,
  },
  icon: {
    backgroundColor: theme.colors.black4,
    padding: theme.space8,
    borderRadius: theme.borderRadiusFull,
  },
  iconTouchable: {
    paddingVertical: theme.space8,
  },
});
