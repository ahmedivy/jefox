"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

import { PlanCard } from "@/components/plan-card";

function Page() {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    toast({
      variant: "destructive",
      description: "Sign in to access this page.",
    });
    redirect("/login");
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold pl-2">Plans</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 w-full gap-4 pt-8">
        <PlanCard />
        <PlanCard />
      </div>
    </main>
  );
}

export default Page;
