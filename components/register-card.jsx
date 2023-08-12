"use client";

import Link from "next/link";
import { ReloadIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useRegister } from "@/lib/hooks/useRegister";
import { useSearchParams } from "next/navigation";

export function RegisterCard() {
  const ref = useSearchParams().get("ref") || "";
  const pos = useSearchParams().get("position") || "left";

  const {
    f,
    handleChange,
    handleSubmit,
    error,
    isLoading,
    validRef,
    refUsername,
    setRefUsername,
    position,
    setPosition,
    handleTerms,
    terms,
    toast,
  } = useRegister(ref, pos);

  return (
    <Card className="mx-1 md:mx-0 min-w-full md:min-w-[740px]">
      <CardHeader className="space-y-2 md:space-y-4 flex flex-col items-center my-3">
        <CardTitle className="text-2xl text-center">
          Create a new account
        </CardTitle>
        <CardDescription>
          Already have an account?{" "}
          <Link href="/login" className="underline text-foreground">
            Login
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="referre">Referrer *</Label>
              <Input
                id="referrer"
                type="text"
                required
                onChange={(e) => {
                  setRefUsername(e.target.value);
                }}
                value={refUsername}
              />
              <p
                className={cn(
                  `text-sm`,
                  refUsername === ""
                    ? "text-muted-foreground"
                    : validRef
                    ? "text-green-500"
                    : "text-red-500"
                )}
              >
                {refUsername === ""
                  ? "Username of your referrer"
                  : validRef
                  ? "Referrer found"
                  : "Referrer not found"}
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Position *</Label>
              <Select
                disabled={!validRef}
                defaultValue="left"
                onValueChange={(p) => setPosition(p)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                {validRef
                  ? "Choose the position"
                  : "First enter a valid referrer"}
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="firstname">First Name *</Label>
              <Input
                id="firstname"
                type="text"
                required
                onChange={handleChange}
                value={f.firstname}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastname">Last Name *</Label>
              <Input
                id="lastname"
                type="text"
                required
                onChange={handleChange}
                value={f.lastname}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username *</Label>
              <Input
                id="username"
                type="text"
                required
                onChange={handleChange}
                value={f.username}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                type="text"
                onChange={handleChange}
                value={f.country}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                onChange={handleChange}
                value={f.email}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                type="text"
                required
                onChange={handleChange}
                value={f.phone}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                required
                onChange={handleChange}
                value={f.password}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                onChange={handleChange}
                value={f.confirmPassword}
              />
            </div>
            <div className="items-top flex space-x-2 col-span-1 md:col-span-2 my-3">
              <Checkbox
                id="terms"
                checked={terms}
                onCheckedChange={handleTerms}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
                <p className="text-sm text-muted-foreground">
                  You agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center col-span-1 md:col-span-2">
                {error}
              </p>
            )}
            <Button
              className="w-full col-span-1 md:col-span-2"
              disabled={isLoading}
              type="submit"
            >
              {isLoading && (
                <ReloadIcon className="animate-spin h-4 w-4 mr-2" />
              )}
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default RegisterCard;
