import { ScrollView } from "react-native";
import React from "react";

import { Activity, ActivityProps } from "@/components/Activity";

import { TopInset } from "@/components/TopInsets";
import { PageHeader } from "@/components/PageHeader";

import { ActivityLoader } from "@/components/ActivityLoader";

function useActivities() {
  // TODO(api-routes): Use `react-query` to fetch activities
  const data: ActivityProps[] = [];
  const isLoading = true;

  return { activities: data as ActivityProps[], isLoading };
}

export function ActivityScreen() {
  const { isLoading, activities } = useActivities();
  return (
    <TopInset>
      <PageHeader title="Activity" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}>
        {isLoading ? (
          <ActivityLoader />
        ) : (
          activities.map((activity, index) => (
            <Activity key={index} {...activity} />
          ))
        )}
      </ScrollView>
    </TopInset>
  );
}
