"use client";

import { useCartStore } from "@/store/cart-store";
import Link from "next/link";
import { useEffect } from "react";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg text-center">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order is being processed and will be
          shipped soon.
        </p>

        <div className="flex justify-center">
          <Link
            href="/products"
            className="px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors duration-200"
          >
            Continue Shopping
          </Link>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          A confirmation email has been sent to your registered email address.
        </p>
      </div>
    </div>
  );
}
