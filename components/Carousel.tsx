"use dom";

import React, { useEffect } from "react";

import "@glidejs/glide/dist/css/glide.core.min.css";
import "./Carousel.css";

import Glide from "@glidejs/glide";

type BannersProps = {
  dom?: import("expo/dom").DOMProps;
};

export default function Carousel(props: BannersProps) {
  // TODO(dom-components): Pass data to the dom component
  const images: string[] = [];
  const onImageClick = (image: string) => {};
  const openBrowser = (link: string) => {};

  useEffect(() => {
    const glide = new Glide(".glide", {
      type: "carousel",
    }).mount();

    return () => {
      glide.destroy();
    };
  }, []);
  return (
    <div className="glide">
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">
          {images?.map((image) => (
            <li className="glide__slide" key={image}>
              <img
                src={image}
                onClick={() => {
                  // TODO(dom-components): Implement on image click and pass image url as a parameter
                  onImageClick?.(image);
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="watermark">
        <button
          onClick={() => {
            // TODO(dom-components): Open browser with the following link
            const link = "https://www.freepik.com";
            openBrowser?.(link);
          }}>
          Design by Freepik
        </button>
      </div>
    </div>
  );
}
