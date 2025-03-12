import React from "react";
import { HomeScreen } from "@/screens/HomeScreen";
import { TopInset } from "@/components/TopInsets";

export default function Home() {
  return (
    <TopInset>
      <HomeScreen />
    </TopInset>
  );
}
