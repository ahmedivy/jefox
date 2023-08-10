"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PlanFeature from "./plan-feature";

function BankCard({ name, image }) {
  return (
    <Card className="h-[412px] py-10 md:px-3 px-1">
      <CardContent className="flex flex-col space-y-5">
        <div className="flex flex-col items-center justify-center p-6">
          <Image src={image} alt={name} height={100} width={100} className="object-contain h-[80px] w-[140px]" />
        </div>
        <h1 className="text-lg font-semibold text-center">
          Deposit with {name}
        </h1>
        <div className="flex flex-col gap-2 items-center py-4">
          <PlanFeature name="Transaction Charges" price="0" tooltip={false} />
          <PlanFeature name="Transaction Limit" price="3-64" tooltip={false} />
        </div>
        <Button className="w-full">Deposit</Button>
      </CardContent>
    </Card>
  );
}

export { BankCard };
