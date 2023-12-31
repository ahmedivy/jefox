"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ReloadIcon } from "@radix-ui/react-icons";

export function LoginCard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const result = await signIn("credentials", {
        redirect: false,
        username,
        password,
        callbackUrl,
      });

      setLoading(false);

      if (result?.error) {
        setError("Sorry, password not correct.");
      } else {
        router.push(callbackUrl);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <Card className="mx-1 md:mx-0 min-w-full md:min-w-[440px]">
      <CardHeader className="space-y-2 md:space-y-4 flex flex-col items-center">
        <CardTitle className="text-2xl test-center">
          Login to your account
        </CardTitle>
        <CardDescription>
          Not a member yet?{" "}
          <Link href="/register" className="underline text-foreground">
            Register
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="username"
                required
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                value={username}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Link href="/forgot/password" className="underline text-foreground">
              Forget Password?
            </Link>
            <Button className="w-full" disabled={isLoading} type="submit">
              {isLoading && (
                <ReloadIcon className="animate-spin h-4 w-4 mr-2" />
              )}
              Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default LoginCard;
