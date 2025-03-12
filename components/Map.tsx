"use dom";

import "mapbox-gl/dist/mapbox-gl.css";

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN;

type MapProps = {
  onMapReady?: () => void;
  dom?: import("expo/dom").DOMProps;
};

export default function Map(props: MapProps) {
  const mapContainerRef = useRef(null);
  const { onMapReady } = props;

  useEffect(() => {
    const mapContainer = mapContainerRef.current;
    if (!mapContainer) {
      return;
    }

    const map = new mapboxgl.Map({
      container: mapContainer,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [19.93658, 50.06143],
      zoom: 12,
      pitch: 30,
      maxZoom: 25,
      minZoom: 10,
    });

    map.once("load", () => {
      onMapReady?.();
    });

    return () => map.remove();
  }, [onMapReady]);

  return (
    <div
      className="map-container"
      ref={mapContainerRef}
      style={{
        width: "100vw",
        height: "100vh",
      }}
    />
  );
}
