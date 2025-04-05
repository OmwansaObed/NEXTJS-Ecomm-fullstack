"use client";

import Stripe from "stripe";
import { Card, CardContent, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  products: Stripe.Product[];
}

const Carousel = ({ products }: Props) => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

  const currentProduct = products[current];
  const price = currentProduct.default_price as Stripe.Price;

  return (
    <div className="relative w-full">
      {/* Carousel navigation dots */}
      <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ease-in-out ${
              index === current ? "bg-black w-4" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Carousel Card */}
      <Card className="overflow-hidden border transition-all duration-200 ease-in-out border-gray-100 shadow-md bg-white">
        {currentProduct.images && currentProduct.images[0] && (
          <div className="relative h-64 md:h-80 w-full">
            <Image
              key={currentProduct.images[0]} // Triggers re-render to restart animation
              src={currentProduct.images[0]}
              alt={currentProduct.name}
              fill
              className="object-cover animate-fade-in"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        )}
        <CardContent className="p-6">
          <CardTitle className="text-xl font-semibold mb-2">
            {currentProduct.name}
          </CardTitle>
          {price && price.unit_amount && (
            <p className="text-lg font-medium text-gray-900">
              Ksh {(price.unit_amount / 100).toFixed(2)}
            </p>
          )}
          <p className="mt-2 text-sm text-gray-500">
            {currentProduct.description ||
              "Experience premium quality and design."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Carousel;
