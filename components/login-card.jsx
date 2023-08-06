"use client";

import Link from "next/link";

import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function LoginCard() {
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
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Login</Button>
      </CardFooter>
    </Card>
  );
}

export default LoginCard;
