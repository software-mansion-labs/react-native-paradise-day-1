import { ScrollView } from "react-native";
import React from "react";

import { Activity, ActivityProps } from "@/components/Activity";

import { TopInset } from "@/components/TopInsets";
import { PageHeader } from "@/components/PageHeader";

import { ActivityLoader } from "@/components/ActivityLoader";
import { useQuery } from "@tanstack/react-query";
import { delay } from "@/utils/delay";
import { activities } from "@/constants/data";

function useActivities() {
  // TODO(api-routes): Use `react-query` to fetch activities
  const { data, isLoading } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      if (!__DEV__) {
        await delay(1000);
        return activities;
      }

      const data = await fetch("/api/activities");
      return data.json();
    },
  });

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
