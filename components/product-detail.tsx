"use client";
import Image from "next/image";
import Stripe from "stripe";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cart-store";

interface Props {
  product: Stripe.Product;
}

const ProductDetails = ({ product }: Props) => {
  const { items, addItem, removeItem } = useCartStore();

  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const price = product.default_price as Stripe.Price;

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount ? price.unit_amount : 0,
      imageUrl: product.images ? product.images[0] : null,
      quantity: 1,
    });
  };
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative h-[400px] md:h-[500px] bg-gray-50 rounded-lg overflow-hidden">
          {product.images && product.images[0] && (
            <div className="absolute inset-0">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover hover:scale-105 transition-all duration-500"
                priority
              />
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            <div className="border-t border-b border-gray-200 py-4">
              <p className="text-2xl font-semibold text-black">
                {price.unit_amount &&
                  `Ksh ${(price.unit_amount / 100).toFixed(2)}`}
              </p>
            </div>

            {product?.description && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900">Features</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Premium quality materials</li>
                <li>Durable construction</li>
                <li>1-year warranty</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <span>{quantity}</span>
            <Button
              onClick={() => removeItem(product.id)}
              className="w-full bg-black hover:bg-gray-800 text-white py-3"
            >
              -
            </Button>
            <Button
              onClick={onAddItem}
              className="w-full bg-black hover:bg-gray-800 text-white py-3"
            >
              +
            </Button>
            <Button className="w-full bg-black hover:bg-gray-800 text-white py-3">
              Add to Cart
            </Button>
            <Button
              variant="outline"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-3"
            >
              Add to Wishlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
