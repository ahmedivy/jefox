"use client";

import { useEffect, useState } from "react";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import Receipt from "./receipt";
import Link from "next/link";

function DepositForm({ method }) {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(null);
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    if (amount < 3) {
      setError("Amount must be greater than 2");
      setIsDisable(true);
    } else if (amount > 65) {
      setError("Amount must be less than 65");
      setIsDisable(true);
    } else {
      setError(null);
      setIsDisable(false);
    }
  }, [amount]);

  return (
    <div className="w-full md:w-[380px]">
      <div className="flex flex-col w-full gap-2">
        <Label className="pl-1">Amount</Label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        {error ? (
          <p className="text-sm text-red-500 pl-1">{error}</p>
        ) : (
          <p className="text-sm text-muted-foreground pl-1">
            In dollars (1$ = 180 PKR)
          </p>
        )}
      </div>

      <Receipt amount={amount} />

      <Button
        className="w-full font-semibold my-8"
        disabled={isDisable}
        asChild
      >
        <Link href={`/deposit/${method}/confirm/?amount=${amount}`}>
          Confirm Deposit
        </Link>
      </Button>
    </div>
  );
}

export default DepositForm;
