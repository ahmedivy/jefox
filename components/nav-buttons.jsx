"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

import { Button } from "./ui/button";
import ThemeToggle from "./theme-toggle";
import { cn } from "@/lib/utils";

function NavButtons({ session, className = "" }) {
  return (
    <div className={cn("flex gap-x-3", className)}>
      {className == "" && <ThemeToggle />}
      {session ? (
        <>
          <Button onClick={signOut} variant="ghost" className="hidden md:block">
            Sign out
          </Button>
          <Button asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </>
      ) : (
        <>
          <Button asChild variant="ghost" className="hidden md:block">
            <Link href="/register">Register</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </>
      )}
    </div>
  );
}

export default NavButtons;
