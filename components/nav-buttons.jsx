import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import { Button } from "./ui/button";
import ThemeToggle from "./theme-toggle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function NavButtons() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex gap-x-3">
      <ThemeToggle />
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
