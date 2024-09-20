"use client";
import { useAuthStore } from "@/store/useAuth-store";
import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCart-store";
import { LuShoppingCart } from "react-icons/lu";

const Navbar = () => {
  const { accessToken, logout } = useAuthStore();
  const { cart, fetchCart } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <nav className="fixed top-0 left-0 w-full h-[10vh] px-[5%] flex justify-between items-center tracking-wide">
      <Link href="/" className="font-bold text-xl">
        Home
      </Link>
      <div className="flex items-center gap-5">
        {accessToken ? (
          <>
            {/* <span className=" mr-4">Welcome, {user && user?.email} </span> */}

            <Link
              href="/cart"
              className="relative w-8 h-8 rounded-md bg-slate-200 flex items-center justify-center "
            >
              <LuShoppingCart />

              {cart?.items?.length && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-red-400 text-white flex text-xs items-center justify-center">
                  {cart?.items?.length ?? 0}
                </span>
              )}
            </Link>
            <Button
              size={"sm"}
              onClick={() => {
                logout();
                router.push("/login");
              }}
              className="text-white bg-red-500/60 hover:bg-red-500 transition-all px-5 rounded"
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/login" className=" mr-4">
              Login
            </Link>
            <Link href="/signup" className="">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
