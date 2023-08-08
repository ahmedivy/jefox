"use client";

import { useSession, signOut } from "next-auth/react";

import { UserNav } from "./user-nav";
import ThemeToggle from "./theme-toggle";

function DashHeader() {
  const { data: session, status } = useSession();

  const user = session?.user;
  const { image, username, email } = user || {};

  return (
    <header className="w-full px-4 flex items-center h-16 justify-end">
      <div className="flex gap-4 pr-3">
        <ThemeToggle />
        {status === "authenticated" ? (
          <UserNav
            img={image}
            username={username}
            email={email}
            signOut={() => signOut({ callbackUrl: "/" })}
          />
        ) : null}
      </div>
    </header>
  );
}

export default DashHeader;
