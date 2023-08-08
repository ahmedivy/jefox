"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

import { useToast } from "@/components/ui/use-toast";

function Page() {
  const { toast } = useToast();
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    toast({
      variant: "destructive",
      description: "Sign in to access this page.",
    });
    redirect("/login");
  }

  return (
    <div>
      
    </div>
  );
}

export default Page;
