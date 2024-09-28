import { useCartStore } from '@/store/useCart-store';
import { Product } from '@/store/useProduct-Store';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { TfiTrash } from 'react-icons/tfi';
import { toast } from 'sonner';
import Image from 'next/image';

interface CartItemProps {
  item: {
    product: Product;
    quantity: number;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateCartItem, removeFromCart } = useCartStore();
  const [quantity, setQuantity] = useState(item.quantity);
  const [updating, setUpdating] = useState(false); // Loading state for updating item
  const [removing, setRemoving] = useState(false); // Loading state for removing item

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
  };

  const handleUpdateCartItem = async (productId: string, quantity: number) => {
    setUpdating(true); // Set updating loader to true
    try {
      await updateCartItem(productId, quantity);
      toast.success('Cart updated successfully!');
    } catch (err) {
      toast.error('Failed to update cart item.');
    } finally {
      setUpdating(false); // Reset updating loader
    }
  };

  const handleRemoveCartItem = async (productId: string) => {
    setRemoving(true); // Set removing loader to true
    try {
      await removeFromCart(productId);
      toast.success('Item removed successfully!');
    } catch (err) {
      toast.error('Failed to remove cart item.');
    } finally {
      setRemoving(false); // Reset removing loader
    }
  };

  return (
    <div className="flex justify-between items-center p-2 py-4 bg-slate-200/30 rounded-lg h-[max-content]">
      <div className="flex items-center">
        <Image
          width={100}
          height={100}
          src="/images/fallback.jpeg"
          alt={item.product.productName}
          onError={(e) => (e.currentTarget.src = 'images/fallback.jpeg')}
          className="w-16 h-16 mr-4"
        />
        <div>
          <h3 className="font-bold">{item.product.productName}</h3>
          <p className="text-xs text-slate-500">{item.product.description}</p>
          <p className="text-sm font-medium">${item.product.price}</p>
        </div>
      </div>
      <div className="flex items-center">
        <Input
          type="number"
          value={quantity}
          min="1"
          onChange={handleQuantityChange}
          className="border w-12 text-center mr-4"
        />
        <Button
          onClick={() => handleUpdateCartItem(item.product._id, quantity)}
          disabled={updating} // Disable button during action
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          {updating ? 'Updating...' : 'Update'}
        </Button>
        <Button
          size={'icon'}
          onClick={() => handleRemoveCartItem(item.product._id)}
          disabled={removing} // Disable button during action
          className="bg-red-500 text-white px-3 py-1 rounded ml-4"
        >
          {removing ? 'Removing...' : <TfiTrash />}
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
