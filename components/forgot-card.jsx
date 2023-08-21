"use client";

import Link from "next/link";
import { useState } from "react";

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

export function ForgotCard() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        setError(data.message);
        setLoading(false);
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
          Reset your password
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                value={email}
              />
            </div>
            {error && <p className="text-sm text-center">{error}</p>}
            <Button className="w-full" disabled={isLoading} type="submit">
              {isLoading && (
                <ReloadIcon className="animate-spin h-4 w-4 mr-2" />
              )}
              Send Reset Link
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default ForgotCard;
