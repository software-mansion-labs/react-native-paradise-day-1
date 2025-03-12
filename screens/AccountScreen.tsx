import { View, ScrollView } from "react-native";
import React from "react";

import { theme } from "@/constants/theme";
import { IconButton } from "@/components/IconButton";
import { Banner } from "@/components/Banner";
import { Shortcut } from "@/components/Shortcut";
import { Divider } from "@/components/Divider";
import { ProfileHeader } from "@/components/ProfileHeader";
import { TopInset } from "@/components/TopInsets";
import { Section } from "@/components/Section";
import { assets } from "@/constants/assets";
import { useUser } from "@clerk/clerk-expo";
import { notImplemented } from "@/utils/notImplemented";

export type AccountScreenProps = {
  navigateToUser?: () => void;
  signOut?: () => void;
};

export function AccountScreen(props: AccountScreenProps) {
  const { user } = useUser();
  const { navigateToUser = notImplemented(), signOut = notImplemented() } =
    props;

  return (
    <TopInset>
      <Section style={{ marginTop: theme.space8 }}>
        <ProfileHeader
          userName={user?.username || "No username"}
          rating={5}
          onPress={() => {
            navigateToUser();
          }}
        />
      </Section>

      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        bounces={false}>
        <Section isRow>
          <Shortcut title="Help" icon="chatbubbles" />
          <Shortcut title="Wallet" icon="wallet" />
          <Shortcut title="Activity" icon="receipt" />
        </Section>

        <Section>
          <Banner
            title="Safety checkup"
            text="Learn ways to make rides safer"
            image={assets.images.safetyCheckup}
          />

          <Banner
            title="Privacy checkup"
            text="Take an interactive tour of your privacy settings"
            image={assets.images.privacyCheckup}
          />

          <Banner
            title="Uber for teens"
            text="Invite your teen to set up their own account"
            image={assets.images.taxiForTeens}
          />
        </Section>

        <Divider style={{ marginBottom: theme.space16 }} />

        <View>
          <IconButton
            title="Family and Teens"
            subtitle="Teen and adult accounts"
            icon="people"
          />
          <IconButton title="Settings" icon="settings" />
          <IconButton
            title="Sign out"
            icon="log-out"
            onPress={() => {
              signOut();
            }}
          />
          <IconButton title="Messages" icon="chatbox" />
          <IconButton title="Send a Gift" icon="gift" />
          <IconButton title="Saved Groups" icon="bookmark" />
          <IconButton
            title="Business Hub"
            subtitle="Manage your business profile"
            icon="briefcase"
          />
          <IconButton title="Promotions" icon="pricetag" />
          <IconButton title="Favorites" icon="heart" />
          <IconButton title="Manage Account" icon="person" />
          <IconButton title="Legal" icon="document" />
          <IconButton
            title="About Apps and Web"
            icon="information-circle"
            onPress={() => {
              throw new Error("Not implemented!");
            }}
          />
        </View>
      </ScrollView>
    </TopInset>
  );
}
