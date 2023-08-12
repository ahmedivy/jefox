"use client";

import { useEffect, useState } from "react";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import Receipt from "./receipt";

import { useToast } from "./ui/use-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

function WithdrawForm({ method, balance, username }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(null);
  const [account, setAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");

  const [mainError, setMainError] = useState(null);

  useEffect(() => {
    if (amount >= 3 && amount <= 64) {
      setError(null);
    } else {
      setError("Amount must be between 3 and 64");
    }
  }, [amount]);

  const confirmSubmit = async () => {
    setIsLoading(true);
    setIsOpen(false);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/users/${username}/transactions/withdrawals`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount + amount * 0.06,
          account: account,
          accountNumber: accountNumber,
          method: method,
        }),
      }
    );

    if (res.error) {
      setIsLoading(false);
      setMainError(res.error);
      return;
    } else {
      setIsLoading(false);
      setAmount(0);
      setAccount("");
      setAccountNumber("");
      setMainError(null);
      setError(null);
      toast({
        description: "Your request has been submitted",
      });
      router.push("/withdraw");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    if (amount < 3 || amount > 64) {
      setError("Amount must be between 3 and 64");
      setIsLoading(false);
      return;
    }

    if (amount > balance) {
      setError("Amount must be less than your balance");
      setIsLoading(false);
      return;
    }

    if (account === "") {
      setMainError("Account name cannot be empty");
      setIsLoading(false);
      return;
    }

    if (accountNumber === "") {
      setMainError("Account number cannot be empty");
      setIsLoading(false);
      return;
    }

    setMainError(null);
    setIsOpen(true);
  };

  return (
    <div className="w-full md:w-[380px]">
      <div className="flex flex-col gap-3">
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
        <div className="flex flex-col w-full gap-2">
          <Label className="pl-1">Account Name</Label>
          <Input
            type="text"
            value={account}
            required
            onChange={(e) => setAccount(e.target.value)}
          />
          <p className="text-sm text-muted-foreground pl-1">
            The name of the account holder
          </p>
        </div>
        <div className="flex flex-col w-full gap-2">
          <Label className="pl-1">Account Number</Label>
          <Input
            type="text"
            value={accountNumber}
            required
            onChange={(e) => setAccountNumber(e.target.value)}
          />
          <p className="text-sm text-muted-foreground pl-1">
            Account number in which you want to withdraw
          </p>
        </div>
      </div>

      <Receipt amount={amount} type="withdraw" />

      {mainError ? (
        <p className="text-sm font-semibold text-red-500 pl-1 text-center my-3">
          {mainError}
        </p>
      ) : null}

      <Button
        className="min-w-full font-semibold my-8"
        disabled={amount < 3 || amount > 64 || amount > balance || isLoading}
        onClick={handleSubmit}
      >
        {isLoading ? "Loading..." : "Confirm Withdraw"}
      </Button>
      <Dialog open={isOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will remove the $ {amount} from
              your account. Please ensure that you have entered the correct
              account details. Our representatives will complete your request in
              24 Hours.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                setIsOpen(false);
                setIsLoading(false);
              }}
              variant="outline"
            >
              Cancel
            </Button>
            <Button onClick={confirmSubmit}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default WithdrawForm;
