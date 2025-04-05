import ProductDetails from "@/components/product-detail";
import { stripe } from "@/lib/stripe";

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const product = await stripe.products.retrieve(id, {
    expand: ["default_price"],
  });
  return <ProductDetails product={product} />;
};

export default ProductPage;
