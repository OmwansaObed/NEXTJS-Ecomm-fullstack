import ProductDetails from "@/components/product-detail";
import { stripe } from "@/lib/stripe";

const ProductPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const product = await stripe.products.retrieve(params.id, {
    expand: ["default_price"],
  });
  return <ProductDetails product={product} />;
};

export default ProductPage;
