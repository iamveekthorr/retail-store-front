'use client';

import CartItem from '@/components/shared/cart-item';
import { useCartStore } from '@/store/useCart-store';
import React, { useEffect, useState, useCallback } from 'react';
import { bouncy } from 'ldrs';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

bouncy.register();

const CartPage: React.FC = () => {
  const { cart, fetchCart, checkout } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shippingAddress, setShippingAddress] = useState<string>('');
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const router = useRouter();

  // Function to fetch cart with local loading state
  const handleFetchCart = useCallback(
    () => async () => {
      setLoading(true);
      try {
        await fetchCart();
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cart');
        setLoading(false);
      }
    },
    [fetchCart]
  );

  // Calculate total items and subtotal
  const totalItems =
    cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const subTotal =
    cart?.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    ) || 0;

  // Function to handle checkout
  const handleCheckout = async () => {
    if (!shippingAddress) {
      toast.error('Please provide a shipping address.');
      return;
    }

    setCheckoutLoading(true);

    try {
      await checkout(cart?.cartId || '', shippingAddress);
      toast.success('Checkout successful!');
      router.push('/');
    } catch (err) {
      toast.error('Checkout failed. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  useEffect(() => {
    handleFetchCart(); // Fetch the cart when the component mounts
  }, [handleFetchCart]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-10">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart ? (
        <div className="grid md:grid-cols-[auto,_30%] gap-4">
          <div className="grid gap-2">
            {cart ? (
              cart.items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))
            ) : (
              <>opps no item in your cart</>
            )}
          </div>
          <div className="checkout p-2  py-4 bg-slate-200/30 rounded-lg space-y-2">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className=" grid gap-2">
              <p className="flex justify-between items-center">
                {' '}
                <span className="text-slate-300 ">Total Items:</span>
                {totalItems}
              </p>
              <p className="flex justify-between items-center">
                {' '}
                <span className="text-slate-300 ">Sub Total:</span> $
                {subTotal.toFixed(2)}
              </p>
            </div>

            <div className="grid gap-3">
              <label className="text-slate-300 ">Shipping address:</label>
              <Textarea
                className="w-full p-2 border rounded mb-4"
                rows={3}
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="Enter your shipping address"
              />
            </div>

            <Button
              size={'sm'}
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="bg-green-500 text-white px-6 py-2 w-full rounded hover:bg-green-600 transition duration-200"
            >
              {checkoutLoading ? 'Processing...' : 'Checkout'}
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-36">
          {' '}
          Empty !!
        </div>
      )}
    </div>
  );
};

export default CartPage;
