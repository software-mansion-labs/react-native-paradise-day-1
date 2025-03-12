import { Rect } from "react-content-loader/native";

import ContentLoader from "react-content-loader/native";

export function HomeScreenLoader() {
  return (
    <ContentLoader
      speed={2}
      width="100%"
      animate={false}
      height={600}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      {/* Search Bar */}
      <Rect x="16" y="16" rx="8" ry="8" width="90%" height="48" />

      {/* Suggestions Title */}
      <Rect x="16" y="96" rx="4" ry="4" width="120" height="24" />

      {/* Suggestion Tiles */}
      <Rect x="16" y="136" rx="8" ry="8" width="80" height="80" />
      <Rect x="112" y="136" rx="8" ry="8" width="80" height="80" />
      <Rect x="208" y="136" rx="8" ry="8" width="80" height="80" />
      <Rect x="304" y="136" rx="8" ry="8" width="80" height="80" />

      {/* Ways to plan Title */}
      <Rect x="16" y="248" rx="4" ry="4" width="180" height="24" />

      {/* Banner Placeholder */}
      <Rect x="16" y="288" rx="8" ry="8" width="90%" height="240" />
    </ContentLoader>
  );
}
