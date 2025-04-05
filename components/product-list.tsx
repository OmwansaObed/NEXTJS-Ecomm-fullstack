"use client";

import Stripe from "stripe";
import { ProductCard } from "./product-card";
import { useState } from "react";

// Define more specific type that allows for different data structures
interface Props {
  products: Stripe.Product[] | { data: Stripe.Product[] } | any;
}

export const ProductList = ({ products }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // More robust handling of different data structures
  const productArray = (() => {
    if (Array.isArray(products)) {
      return products;
    } else if (
      products &&
      typeof products === "object" &&
      "data" in products &&
      Array.isArray(products.data)
    ) {
      return products.data;
    } else {
      console.error("Products data is not in expected format:", products);
      return [];
    }
  })();

  const filteredProducts = productArray.filter((product) => {
    if (!product) return false;

    const term = searchTerm.toLowerCase();
    const nameMatch = product.name && product.name.toLowerCase().includes(term);
    const descriptionMatch = product.description
      ? product.description.toLowerCase().includes(term)
      : false;
    return nameMatch || descriptionMatch;
  });

  // Add null check for empty product list
  if (productArray.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-500">No products available</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="relative max-w-md mx-auto md:mx-0">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products"
            className="w-full py-2 px-4 pr-10 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          />
          <svg
            className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <li key={product.id || index}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};
