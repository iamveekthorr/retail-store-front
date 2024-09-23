'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/useAuth-store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { zoomies } from "ldrs";

zoomies.register();


interface RegisterFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const { register, handleSubmit,  } = useForm<RegisterFormInputs>();
  const { register: signUp, loading, error, success } = useAuthStore();
  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.warning("Passwords do not match");
    }
    await signUp(data.email, data.password, data.confirmPassword);
    if (error) {
      toast.error(error);
    }

    if (success) {
      toast.success("Sign Up successful!!");
      router.replace("/login");
    }
  };



  return (
    <div className="flex items-center justify-center h-screen w-full">
    <form onSubmit={handleSubmit(onSubmit)}>
     
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2 space-y-2  mb-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2 space-y-2  mb-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              required
            />
          </div>
          <div className="grid gap-2 space-y-2">
            <Label htmlFor="password">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", { required: "Password is required" })}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="grid gap-3 space-y-2">
          <Button className="w-full">
            {loading ? (
              <l-zoomies
                size="80"
                stroke="5"
                bg-opacity="0.1"
                speed="1.4"
                color="white"
              ></l-zoomies>
            ) : (
              "Sign Up"
            )}
          </Button>
          <p className="text-sm text-center mt-2">
           Already got an account? <Link href="/login">Login</Link>
          </p>
        </CardFooter>
      </Card>
    </form>
  </div>
  );
};

export default Register;
