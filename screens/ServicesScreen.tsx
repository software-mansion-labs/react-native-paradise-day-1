import React, { useState } from "react";

import { TopInset } from "@/components/TopInsets";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { Section } from "@/components/Section";
import { Tile } from "@/components/Tile";
import { Divider } from "@/components/Divider";
import { theme } from "@/constants/theme";
import { assets } from "@/constants/assets";
import * as Crypto from "expo-crypto";
import localModule from "@/modules/local-module";

const secretCode = "8ca9543cc62a05538adf41c0592f1527";
const secretCodeLength = 4;

export function ServicesScreen() {
  const [sequence, setSequence] = useState<string[]>([]);

  const handleTilePress = async (title: string) => {
    const newSequence = [...sequence, title].slice(-secretCodeLength);

    if (newSequence.length === secretCodeLength) {
      const hash = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.MD5,
        JSON.stringify(newSequence)
      );

      if (secretCode === hash) {
        localModule?.hello();
      }
    }

    setSequence(newSequence);
  };

  return (
    <TopInset>
      <PageHeader title="Services" />

      <SectionHeader title="Go anywhere, get anything" />
      <Section isRow>
        <Tile
          title="Ride"
          image={assets.images.taxiCar}
          onPress={() => handleTilePress("Ride")}
        />
        <Tile
          title="Reserve"
          image={assets.images.calendar}
          onPress={() => handleTilePress("Reserve")}
        />
        <Tile
          title="2-Wheels"
          image={assets.images.scooter}
          onPress={() => handleTilePress("2-Wheels")}
        />
        <Tile
          title="Teens"
          image={assets.images.boy}
          onPress={() => handleTilePress("Teens")}
        />
      </Section>
      <Section isRow>
        <Tile
          title="Package"
          image={assets.images.package}
          onPress={() => handleTilePress("Package")}
        />
        <Tile
          title="Charter"
          image={assets.images.bus}
          onPress={() => handleTilePress("Charter")}
        />
        <Tile
          title="Explore"
          image={assets.images.rocket}
          onPress={() => handleTilePress("Explore")}
        />
        <Tile
          title="Travel"
          image={assets.images.travel}
          onPress={() => handleTilePress("Travel")}
        />
      </Section>

      <Divider style={{ marginBottom: theme.space16 }} />

      <SectionHeader title="Get anything delivered" />

      <Section isRow>
        <Tile
          title="Restaurants"
          image={assets.images.restaurants}
          onPress={() => handleTilePress("Restaurants")}
        />
        <Tile
          title="Grocery"
          image={assets.images.grocery}
          onPress={() => handleTilePress("Grocery")}
        />
      </Section>

      <Section isRow>
        <Tile
          title="Alcohol"
          image={assets.images.cocktail}
          onPress={() => handleTilePress("Alcohol")}
        />
        <Tile
          title="Market"
          image={assets.images.grocery}
          onPress={() => handleTilePress("Market")}
        />
        <Tile
          title="Food"
          image={assets.images.burger}
          onPress={() => handleTilePress("Food")}
        />
        <Tile
          title="Pharmacy"
          image={assets.images.pharmacy}
          onPress={() => handleTilePress("Pharmacy")}
        />
      </Section>
    </TopInset>
  );
}
