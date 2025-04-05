import Carousel from "@/components/Carousel";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import Image from "next/image";
import Link from "next/link";

const Home = async () => {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });
  // console.log(products);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-16 px-6 md:px-12 bg-">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex flex-col space-y-6 md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Welcome to E-comm
            </h2>
            <p className="text-lg text-gray-600">
              Discover the latest products at affordable prices
            </p>
            <Button
              asChild
              variant="default"
              className="w-fit bg-black hover:bg-gray-800 text-white"
            >
              <Link href="/products">Browse All Products</Link>
            </Button>
          </div>
          <div className="md:w-1/2 relative">
            <div className="bg-trasparentp-4 rounded-lg overflow-hidden">
              <Image
                src={products.data[0].images[0]}
                alt="Banner Image"
                width={450}
                height={450}
                className="object-contain rounded shadow-sm hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">
            Featured Products
          </h3>
          <Carousel products={products.data} />
        </div>
      </section>
    </div>
  );
};

export default Home;
