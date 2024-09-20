"use client";
import { useProductStore } from "@/store/useProduct-Store";
import { useEffect } from "react";
import { bouncy } from "ldrs";
import ProductCard, { Product } from "@/components/shared/product-card/product-card";

bouncy.register();

export default function Home() {
  const { products, loading, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center" >
        <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>
      </div>
    );
  }
  return (
    <div className="">
      {" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products ? (
          products.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">No products available.</div>
        )}
      </div>
    </div>
  );
}
