"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useToast } from "./ui/use-toast";
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

export function ResetCard({ email, token }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();

  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/password/change", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, token }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        toast({
          description: "Password changed successfully, login with new one.",
        });
        router.push("/login");
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
          Create new Password
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <Button className="w-full" disabled={isLoading} type="submit">
              {isLoading && (
                <ReloadIcon className="animate-spin h-4 w-4 mr-2" />
              )}
              Change Password
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default ResetCard;
