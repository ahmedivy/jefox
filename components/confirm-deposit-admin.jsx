"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";
import { useState } from "react";

function ConfirmDepositAdmin({ id, imageUrl }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onConfirm = async () => {
    setIsLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/transactions/deposits/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "confirm",
        }),
      }
    );

    router.push("/admin/deposits");
  };

  const onCancel = async () => {
    setIsLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/transactions/deposits/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "cancel",
        }),
      }
    );

    router.push("/admin/deposits");
  };

  return (
    <div className="flex flex-col items-center w-full lg:w-1/2 gap-3 my-4">
      <p className="font-medium">Payment Screenshot</p>

      <Image
        src={imageUrl}
        height="500"
        width="500"
        alt="Payment Screenshot"
        className="rounded-sm w-full cursor-pointer"
        onClick={() => {
          window.open(imageUrl, "_blank");
        }}
      />

      <Button
        className="w-full"
        onClick={() => {
          window.open(imageUrl, "_blank");
        }}
        disabled={isLoading}
      >
        Open Image
      </Button>

      <div className="flex gap-2 items-center my-6 w-full">
        <Button
          className="flex-grow bg-red-500 text-white hover:opacity-75 hover:bg-red-500"
          disabled={isLoading}
          onClick={onCancel}
        >
          Cancel Deposit
        </Button>
        <Button
          className="flex-grow bg-green-500 text-white hover:opacity-75 hover:bg-green-500"
          disabled={isLoading}
          onClick={onConfirm}
        >
          Confirm Deposit
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDepositAdmin;
