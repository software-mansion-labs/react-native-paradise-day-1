import React from "react";
import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import type {
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";
import type {
  TabNavigationState,
  ParamListBase,
} from "@react-navigation/native";
import { TopInset } from "@/components/TopInsets";
import { defaults } from "@/constants/defaults";
import { EatsTopBarLabel, RidesTopBarLabel } from "@/components/TopBarLabel";

const { Navigator } = createMaterialTopTabNavigator();

const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function Layout() {
  return (
    <TopInset>
      <MaterialTopTabs screenOptions={defaults.navigation.topTabs}>
        <MaterialTopTabs.Screen
          name="index"
          options={{
            title: "Rides",
            tabBarLabel: RidesTopBarLabel,
          }}
        />
        <MaterialTopTabs.Screen
          name="eats"
          options={{
            title: "Eats",
            tabBarLabel: EatsTopBarLabel,
          }}
        />
      </MaterialTopTabs>
    </TopInset>
  );
}
