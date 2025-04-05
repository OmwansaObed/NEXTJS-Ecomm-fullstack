import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
// types/product.ts
// export interface SimplifiedProduct {
//   id: string;
//   name: string;
//   description: string | null;
//   images: string[];
//   price: {
//     id: string;
//     unit_amount: number | null;
//     currency: string;
//   } | null;
//   metadata?: Record<string, string>; // Optional metadata field
// }
