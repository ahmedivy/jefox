"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

function Nav({ session }) {
  return (
    <div className="flex flex-col space-y-3 pt-8">
      <Button variant="ghost">Home</Button>
      <Button variant="ghost">Features</Button>
      <Button variant="ghost">Community</Button>
      {session ? (
        <>
          <Button onClick={signOut} variant="ghost">
            Sign out
          </Button>
          <Button asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </>
      ) : (
        <>
          <Button asChild variant="ghost">
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

export default Nav;
