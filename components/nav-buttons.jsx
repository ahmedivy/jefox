"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import { Button } from "./ui/button";

function NavButtons() {
  const { status } = useSession();

  return (
    <div className="flex gap-x-3">
      {status === "authenticated" ? (
        <>
          <Button onClick={signOut} variant="outline">
            Sign out
          </Button>

          <Button asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </>
      ) : (
        <>
          <Button asChild variant="outline">
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
