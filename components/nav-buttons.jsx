"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import { Button } from "./ui/button";
import ThemeToggle from "./theme-toggle";

function NavButtons() {
  const { status } = useSession();

  return (
    <div className="flex gap-x-3">
      <ThemeToggle />
      {status === "authenticated" ? (
        <>
          <Button onClick={signOut} variant="ghost" className="hidden md:block">
            Sign out
          </Button>
          <Button asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </>
      ) : status === "loading" ? null : (
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
