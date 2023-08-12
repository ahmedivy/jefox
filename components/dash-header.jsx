"use client";

import { useSession, signOut } from "next-auth/react";
import { FiMenu } from "react-icons/fi";

import DashNav from "./dash-nav";
import { Button } from "./ui/button";
import { UserNav } from "./user-nav";
import ThemeToggle from "./theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function DashHeader({ user }) {
  return (
    <header className="w-full px-4 py-2 flex items-center h-16 justify-between md:justify-end">
      <div className="flex md:hidden space-x-4">
        <Sheet>
          <SheetTrigger>
            <Button variant="ghost" size="icon" asChild className="h-6 w-6">
              <FiMenu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[220px] p-4">
            <div className="flex flex-col space-y-3">
              <DashNav />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex gap-4 pr-3 items-center justify-center">
        <ThemeToggle />
        <UserNav
          img={user.image}
          username={user.username}
          email={user.email}
          signOut={() => signOut({ callbackUrl: "/" })}
        />
      </div>
    </header>
  );
}

export default DashHeader;
