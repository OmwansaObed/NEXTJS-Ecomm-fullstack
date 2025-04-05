import Link from "next/link";
import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface Props {
  product: Stripe.Product;
}

export const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;
  return (
    <Link
      href={`/products/${product.id}`}
      className="block transition-transform hover:shadow-md  duration-300"
    >
      <Card className="h-full overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
        <div className="relative h-56 bg-gray-50">
          {product.images && product.images[0] && (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover hover:scale-105 transition-all duration-300"
            />
          )}
        </div>
        <CardHeader className="p-4">
          <CardTitle className="text-lg font-medium text-gray-900 line-clamp-2">
            {product.name}
          </CardTitle>
          <CardContent className="p-0 pt-2">
            <p className="text-sm text-gray-500 line-clamp-2">
              {product.description}
            </p>
            <p className="font-semibold text-black">
              {price.unit_amount &&
                `Ksh ${(price.unit_amount / 100).toFixed(2)}`}
            </p>
            <Button className="w-full mt-2">View Details</Button>
          </CardContent>
        </CardHeader>
      </Card>
    </Link>
  );
};
