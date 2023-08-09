"use client";

import { Button } from "./ui/button";
import PlanFeature from "./plan-feature";
import { Card, CardContent } from "@/components/ui/card";

function PlanCard({ price, treeCommission, referralCommission, name }) {
  return (
    <Card className="h-[380px] py-10 md:px-3 px-1">
      <CardContent className="flex flex-col space-y-5">
        <h1 className="text-2xl font-semibold text-center">{name}</h1>
        <p className="text-4xl font-bold leading-6 text-center">$ {price}</p>
        <div className="w-full flex flex-col gap-4 py-12">
          <PlanFeature
            name="Tree Commission"
            price={treeCommission}
            description="This is the commission you get when someone from your tree subscribes to a plan."
          />
          <PlanFeature
            name="Referral Commission"
            price={referralCommission}
            description="This is the commission you get when someone from your referrals subscribes to a plan."
          />
        </div>
        <Button className="w-full">Subscribe</Button>
      </CardContent>
    </Card>
  );
}

export { PlanCard };
