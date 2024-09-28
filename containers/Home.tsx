'use client';
import { useProductStore } from '@/store/useProduct-Store';
// import { useEffect } from 'react';
import { bouncy } from 'ldrs';
import axios from 'axios';

import ProductCard, {
  Product,
} from '@/components/shared/product-card/product-card';
import { useAuthStore } from '../store/useAuth-store';
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect.hook';
import { useState } from 'react';
import RecommendationCard from '../components/shared/recommendations-card/recommendation.card';

bouncy.register();

export default function Home() {
  const { products, loading, fetchProducts } = useProductStore();
  const [recommendations, setRecommendations] =
    useState<Array<Record<string, string>>>();

  const authStore = useAuthStore();

  const api = axios.create({
    baseURL: 'https://recommender-api-prp9.onrender.com',
    // You can add other default settings here, such as headers
  });

  useIsomorphicLayoutEffect(() => {
    fetchProducts();
    if (authStore.accessToken?.length) {
      // Get recommendations for the current user
      api
        .get(
          `/api/recommendations/${
            (authStore?.user as Record<string, string>)?.id
          }`
        )
        .then(({ data }) => setRecommendations(data.data));
    }
  }, [fetchProducts, authStore]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>
      </div>
    );
  }
  return (
    <div className="">
      <>
        {authStore.accessToken?.length && (
          <>
            <p className="mb-10 text-2xl font-extrabold capitalize mt-10">
              Recommended for you
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-20">
              {recommendations ? (
                recommendations.map((product: Record<string, string>) => (
                  <RecommendationCard key={product._id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500">
                  You have to make put things in your cart to have
                  recommendations.
                </div>
              )}
            </div>
          </>
        )}

        <p className="mb-10 text-2xl font-extrabold capitalize">all products</p>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products ? (
            products.map((product: Product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No products available.
            </div>
          )}
        </div>
      </>
    </div>
  );
}
