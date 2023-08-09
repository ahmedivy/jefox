import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";

import PlanFeature from "./plan-feature";
import { Button } from "./ui/button";

function PlanCard() {
  return (
    <Card className="h-[380px] py-10 px-3">
      <CardContent className="flex flex-col space-y-5">
        <h1 className="text-2xl font-semibold text-center">Gold</h1>
        <p className="text-4xl font-bold leading-6 text-center">$ 9.99</p>
        <div className="w-full flex flex-col gap-4 py-12">
          <PlanFeature
            name="Referral Commission"
            price="0.5"
            description="This is the commission you get when someone from your referrals subscribes to a plan."
          />
          <PlanFeature
            name="Tree Commission"
            price="0.99"
            description="This is the commission you get when someone from your tree subscribes to a plan."
          />
        </div>
        <Button className="w-full" onClick={() => {}}>
          Subscribe
        </Button>
      </CardContent>
    </Card>
  );
}

export { PlanCard };
