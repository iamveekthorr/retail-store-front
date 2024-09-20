"use client";
import { Button } from "@/components/ui/button";
import { zoomies } from "ldrs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/useAuth-store";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const description =
  "A simple login form with email and password. The submit button says 'Sign in'.";
zoomies.register();

interface LoginFormInputs {
  email: string;
  password: string;
}

function Page() {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const { login, loading, error, success } = useAuthStore();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    await login(data.email, data.password);
    if (error) {
      toast.error(error);
    }

    if (success) {
      toast.success("Login successful!!");
      router.replace("/");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        {" "}
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="grid gap-3">
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
                "Sign In"
              )}
            </Button>
            <p className="text-sm text-center">
              Don&#39;t have an account? <Link href="/register">Register</Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default Page;
