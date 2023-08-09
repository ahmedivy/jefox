"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { LuDollarSign } from "react-icons/lu";
import { BsCreditCardFill } from "react-icons/bs";
import { AiOutlineUserSwitch, AiFillBank } from "react-icons/ai";

import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <main className="p-4">
      <h1 className="text-2xl font-bold pl-2">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-4 pt-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <LuDollarSign />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">34,234,534.53 Rs.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Referrals</CardTitle>
            <AiOutlineUserSwitch />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 Users</div>
            <p className="text-xs text-muted-foreground">2 Left, 1 Right</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Deposited
            </CardTitle>
            <AiFillBank />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">34,234,534.53 Rs.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Withdrawn
            </CardTitle>
            <BsCreditCardFill />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">34,234,534.53 Rs.</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default Page;
