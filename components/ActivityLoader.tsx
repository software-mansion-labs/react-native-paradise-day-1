import { theme } from "@/constants/theme";
import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { View } from "react-native";

export function ActivityLoader() {
  const items = Array(10).fill(0);
  return (
    <>
      {items.map((_, index) => (
        <React.Fragment key={index}>
          <ContentLoader
            speed={1}
            animate={false}
            width="100%"
            height={80}
            viewBox="0 0 400 80"
            backgroundColor={theme.colors.black4}
            foregroundColor={theme.colors.black10}>
            {/* Image placeholder */}
            <Rect x="16" y="16" rx="10" ry="10" width="48" height="48" />

            {/* Title placeholder */}
            <Rect x="82" y="12" rx="4" ry="4" width="200" height="16" />

            {/* Date and price placeholder */}
            <Rect x="82" y="36" rx="4" ry="4" width="160" height="12" />
            <Rect x="82" y="54" rx="4" ry="4" width="160" height="12" />

            {/* Reorder button placeholder */}
            <Rect x="300" y="30" rx="20" ry="20" width="84" height="28" />
          </ContentLoader>
          {index < items.length - 1 && (
            <View
              style={{
                height: 1,
                backgroundColor: theme.colors.black10,
                marginLeft: 92,
                marginVertical: theme.space4,
              }}
            />
          )}
        </React.Fragment>
      ))}
    </>
  );
}
