import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/useCart-store';
import React from 'react';
import { toast } from 'sonner';
import { zoomies } from 'ldrs';
import Image from 'next/image';

zoomies.register();

// Define the product type with an image field

// ProductCard Component
const RecommendationCard: React.FC<{ product: Record<string, string> }> = ({
  product,
}) => {
  const { addToCart, error, success } = useCartStore();

  const add = () => {
    addToCart(product._id, 1);

    if (error) {
      toast.error(error);
    }

    if (success) {
      toast.success('Added successfully!!');
    }
  };
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg border border-gray-200">
      {/* Product Image */}
      <Image
        src="/images/fallback.jpeg"
        alt={product.productName}
        className="w-full h-24 md:h-48 object-cover mb-4"
        onError={(e) => (e.currentTarget.src = 'images/fallback.jpeg')}
        width={100}
        height={100}
      />

      {/* Product Info */}

      <div className="info px-3 py-2 space-y-2 grid">
        <div className=" flex justify-between items-center">
          <div className="font-bold text-lg md:text-xl ">
            {product.productName}
          </div>
        </div>
        <p className="text-sm text-gray-600">${product.price}</p>
        <Button
          size={'sm'}
          onClick={add}
          className="bg-black/50 text-white font-bold py-2 px-4 rounded hover:bg-black transition duration-500"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default RecommendationCard;
