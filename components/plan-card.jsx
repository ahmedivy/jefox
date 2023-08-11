"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "./ui/button";
import PlanFeature from "./plan-feature";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "./ui/use-toast";

function PlanCard({ price, treeCommission, referralCommission, name }) {
  const [balance, setBalance] = useState(0);
  const [plan, setPlan] = useState(null);
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBalance = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/users/${session?.user?.username}/balance`
      );
      const data = await res.json();
      setBalance(data.balance);
    };

    if (status === "authenticated") {
      getBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getPlan = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/users/${session?.user?.username}`
      );
      const data = await res.json();
      setPlan(data.plan);
    };

    if (status === "authenticated") {
      getPlan();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubscribe = async () => {
    if (balance < price) {
      toast({
        variant: "destructive",
        description: "You don't have enough balance to subscribe to this plan.",
      });
      return;
    }

    setLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/plans/activate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planName: name,
          username: session?.user?.username,
        }),
      }
    );

    const data = await res.json();
    if (data.error) {
      toast({
        variant: "destructive",
        description: data.error,
      });
      setLoading(false);
      return;
    } else {
      toast({
        description: "Plan activated successfully.",
      });
      setLoading(false);
      return;
    }
  };

  return (
    <Card className="h-[380px] py-10 md:px-3 px-1">
      <CardContent className="flex flex-col space-y-5">
        <h1 className="text-2xl font-semibold text-center">{name}</h1>
        <p className="text-4xl font-bold leading-6 text-center">$ {price}</p>
        <div className="w-full flex flex-col gap-4 py-12">
          <PlanFeature
            name="Tree Commission"
            price={treeCommission}
            description="When someone from your below tree subscribe this plan, You will get this amount as tree commission."
          />
          <PlanFeature
            name="Referral Commission"
            price={referralCommission}
            description="When your referred user subscribe in ANY PLAN, you will get this amount."
          />
        </div>
        <Button className="w-full" onClick={handleSubscribe} disabled={loading}>
          {loading && <ReloadIcon className="animate-spin h-4 w-4 mr-2" />}
          {loading ? "Subscribing..." : "Subscribe"}
        </Button>
      </CardContent>
    </Card>
  );
}

export { PlanCard };
