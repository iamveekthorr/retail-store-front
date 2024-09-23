import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCart-store";
import React from "react";
import { toast } from "sonner";
import { zoomies } from "ldrs";

zoomies.register();

// Define the product type with an image field
export interface Product {
  _id: string;
  productName: string;
  category: string;
  store: {
    _id: string;
    name: string;
    description: string;
  };
  description: string;
  price: number;
  quantity: number;
  id: string;
  image: string; // New field for the image URL
}

// ProductCard Component
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart, error, success} = useCartStore();

  const add = () => {
    addToCart(product._id, 1);
   

    if (error) {
      toast.error(error);
    }

    if (success) {
      toast.success("Added successfully!!");
    }
  };
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg border border-gray-200">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.productName}
        className="w-full h-24 md:h-48 object-cover mb-4"
      />

      {/* Product Info */}

      <div className="info px-3 py-2 space-y-2 grid">
        <div className=" flex justify-between items-center">
          <div className="font-bold text-lg md:text-xl ">{product.productName}</div>
          {/* <p className="text-gray-700 text-base mb-2">{product.description}</p> */}

          <p className="capitalize text-gray-600  bg-slate-200/40 p-1 px-1.5 text-xs">
            {product.store.name}
          </p>
        </div>
        <p className="text-sm text-gray-600">${product.price}</p>
        <Button
          size={"sm"}
          onClick={add}
          className="bg-black/50 text-white font-bold py-2 px-4 rounded hover:bg-black transition duration-500"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
