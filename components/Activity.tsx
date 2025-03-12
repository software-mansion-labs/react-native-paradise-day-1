import { View, StyleSheet } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { formatDate, formatPrice } from "@/utils/formatters";
import { Divider } from "./Divider";
import { theme } from "@/constants/theme";
import { ThemedText } from "@/components/ThemedText";
import { Badge } from "./Badge";
import { assets } from "@/constants/assets";
import { Button } from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";

interface BaseActivity {
  id?: string;
  title: string;
  date: Date | string;
  price: number;
  currency: string;
}

interface FoodActivity extends BaseActivity {
  type: "food";
  image: string;
  numberOfItems: number;
}

interface RideActivity extends BaseActivity {
  type: "ride";
}

export type ActivityProps = FoodActivity | RideActivity;

type ReorderButtonProps = {
  onPress: () => void;
};

function ReorderButton({ onPress }: ReorderButtonProps) {
  return (
    <View style={styles.buttonContainer}>
      <Button style={styles.button} onPress={onPress}>
        <Badge
          text="Reorder"
          icon="repeat"
          iconSize="12"
          textSize="10"
          backgroundColor="transparent"
          style={styles.badge}
        />
      </Button>
    </View>
  );
}

type ActivityImageProps = {
  source: number;
};

function ActivityImage({ source }: ActivityImageProps) {
  return (
    <View style={styles.imageContainer}>
      <Image source={source} style={styles.image} contentFit="cover" />
    </View>
  );
}

type ActivityDetailsProps = {
  title: string;
  formattedDate: string;
  priceText: string;
};

function ActivityDetails(props: ActivityDetailsProps) {
  const { title, formattedDate, priceText } = props;

  return (
    <View style={styles.details}>
      <ThemedText
        fontSize={theme.fontSize14}
        fontWeight="medium"
        style={styles.titleText}>
        {title}
      </ThemedText>
      <View style={styles.detailsSecondary}>
        <ThemedText
          fontSize={theme.fontSize12}
          fontWeight="light"
          style={styles.dateText}
          color={theme.colors.black60}>
          {formattedDate}
        </ThemedText>
        <ThemedText
          fontSize={theme.fontSize12}
          fontWeight="medium"
          color={theme.colors.black70}>
          {priceText}
        </ThemedText>
      </View>
    </View>
  );
}

export function Activity(props: ActivityProps) {
  const formattedDate = formatDate(props.date);
  const formattedPrice = formatPrice(props.price);

  const imageSource =
    props.type === "food"
      ? // @ts-ignore
        assets.images[props.image]
      : assets.images.car;

  const priceText =
    props.type === "food"
      ? `${props.currency} ${formattedPrice} · ${props.numberOfItems} ${
          props.numberOfItems > 1 ? "items" : "item"
        }`
      : `${props.currency} ${formattedPrice}`;

  const handleReorder = () => {
    if (props.type === "food") {
      console.log(`Reordering food: ${props.title}`);
    } else {
      console.log(`Booking ride: ${props.title}`);
    }
  };

  // Activity type indicator icon and color
  const typeIcon = props.type === "food" ? "restaurant" : "car";
  const activityColor = props.type === "food" ? "#f4a261" : "#4361ee";

  return (
    <View>
      <View style={styles.activityDetailsContainer}>
        <View style={styles.container}>
          <ActivityImage source={imageSource} />
          <View
            style={[
              styles.typeIconContainer,
              { backgroundColor: activityColor },
            ]}>
            <Ionicons name={typeIcon} size={12} color={theme.colors.white} />
          </View>
          <ActivityDetails
            title={props.title}
            formattedDate={formattedDate}
            priceText={priceText}
          />
          <ReorderButton onPress={handleReorder} />
        </View>
      </View>

      <Divider
        width="thin"
        style={{
          marginLeft: 92,
          marginVertical: theme.space4,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  activityDetailsContainer: {
    borderRadius: theme.borderRadius10,
    marginHorizontal: theme.space8,
  },
  container: {
    flexDirection: "row",

    paddingHorizontal: theme.space16,
    paddingVertical: theme.space8,
    alignItems: "center",
    position: "relative",
  },
  imageContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius10,
  },
  image: {
    width: theme.space12 * 4,
    height: theme.space12 * 4,
    borderRadius: theme.borderRadius10,
    backgroundColor: theme.colors.black4,
  },
  typeIconContainer: {
    position: "absolute",
    left: theme.space16 + theme.space12 * 3,
    top: theme.space8 + 4,
    backgroundColor: theme.colors.green,
    borderRadius: 100,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.colors.white,
    ...theme.shadows.small,
    zIndex: 1,
  },
  details: {
    flex: 1,
    marginLeft: theme.space12 + 6,
    justifyContent: "center",
  },
  titleText: {
    marginBottom: 2,
  },
  detailsSecondary: {
    marginTop: 2,
  },
  dateText: {
    marginBottom: 1,
  },
  buttonContainer: {
    justifyContent: "center",
  },
  button: {
    borderRadius: theme.borderRadius20,
    padding: theme.space4,
  },
  badge: {
    borderWidth: 0,
  },
});
