"use client";

import { useEffect, useState } from "react";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

function DepositForm() {
  const [amount, setAmount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (amount >= 3 && amount <= 64) {
      setError(null);
    } else {
      setError("Amount must be between 3 and 64");
    }
  }, [amount]);

  return (
    <div className="w-full md:w-[380px]">
      <form>
        <div className="flex flex-col w-full gap-2">
          <Label className="pl-1">Amount</Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {error ? (
            <p className="text-sm text-red-500 pl-1">{error}</p>
          ) : (
            <p className="text-sm text-muted-foreground pl-1">
              In dollars (1$ = 180 PKR)
            </p>
          )}
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              receipt
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between border-b-2 py-2">
          <p className="text-sm">Amount ($)</p>
          <p>{amount || 0}</p>
        </div>
        <div className="flex items-center justify-between border-b-2 py-2">
          <p className="text-sm">Amount (PKR)</p>
          <p>{amount * 180 || 0}</p>
        </div>
        <div className="flex items-center justify-between border-b-2 py-2">
          <p className="text-sm">Charges ($)</p>
          <p>{0}</p>
        </div>
        <div className="flex items-center justify-between border-b-2 py-2 text-green-500">
          <p className="text-sm">Total Amount (PKR)</p>
          <p>{amount * 180 || 0}</p>
        </div>
        <Button className="w-full font-semibold my-8" disabled={error !== null}>
          Deposit
        </Button>
      </form>
    </div>
  );
}

export default DepositForm;
