"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PlanFeature from "./plan-feature";
import Link from "next/link";
import { cn } from "@/lib/utils";

function BankCard({ name, image, href, type = "deposit" }) {
  return (
    <Card
      className={cn(
        "py-10 md:px-3 px-1",
        type === "deposit" ? "h-[412px]" : "h-[435px]"
      )}
    >
      <CardContent className="flex flex-col space-y-5">
        <div className="flex flex-col items-center justify-center p-6">
          <Image
            src={image}
            alt={name}
            height={100}
            width={100}
            className="object-contain h-[80px] w-[140px]"
          />
        </div>
        <h1 className="text-lg font-semibold text-center">
          {type === "withdraw" ? "Withdraw" : "Deposit"} with {name}
        </h1>
        <div className="flex flex-col gap-2 items-center py-4">
          <PlanFeature
            name="Transaction Charges"
            price={type === "withdraw" ? "6%" : "0"}
            tooltip={false}
          />
          <PlanFeature name="Transaction Limit" price="3-64" tooltip={false} />
          {type === "withdraw" && (
            <PlanFeature
              name="Processing Time"
              message={"24 Hours"}
              tooltip={false}
            />
          )}
        </div>
        <Button className="w-full" asChild>
          <Link href={href}>{type === "deposit" ? "Deposit" : "Withdraw"}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export { BankCard };
