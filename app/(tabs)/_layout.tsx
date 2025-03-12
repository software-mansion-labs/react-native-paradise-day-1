import React from "react";
import { Tabs } from "expo-router";
import { defaults } from "@/constants/defaults";
import {
  HomeIcon,
  ServicesIcon,
  ActivityIcon,
  AccountIcon,
} from "@/components/TabBarIcon";

export default function Layout() {
  return (
    <Tabs screenOptions={defaults.navigation.tabs}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: HomeIcon,
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: "Services",
          tabBarIcon: ServicesIcon,
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          tabBarIcon: ActivityIcon,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: AccountIcon,
        }}
      />
    </Tabs>
  );
}
