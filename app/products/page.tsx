import { ProductList } from "@/components/product-list";
import { stripe } from "@/lib/stripe";

const Products = async () => {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });
  const plainProduct = JSON.parse(JSON.stringify(products));
  return (
    <div>
      <h1>All Products</h1>
      <ProductList products={plainProduct} />
    </div>
  );
};

export default Products;
