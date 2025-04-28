"use client";

import Slider from "react-slick";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface SliderProps {
  images: any[]; // Array of images from Sanity
}

export default function SubscriptionSlider({ images }: SliderProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 250,
    slidesToShow: 1, // Ensure only one slide is shown at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    adaptiveHeight: false, // Prevent height adjustments that might cause vertical issues
  };

  return (
    <div className="w-full mx-auto mb-12">
      <Slider {...settings}>
        {images.map((image, index) => {
          const imageUrl = image?.asset
            ? urlFor(image).url()
            : "/placeholder-image.jpg"; // Fallback image

          return (
            <div key={index} className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image
                src={imageUrl}
                alt={`Slider Image ${index + 1}`}
                width={1920} // Increased width for larger screens
                height={350}// Matches h-64 (64px * 4 for Tailwind scale)
                className="object-cover w-full h-full"
              />
              
            </div>
          );
        })}
      </Slider>
    </div>
  );
}