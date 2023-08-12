"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function ConfirmWithdrawAdmin({ id }) {
  const router = useRouter();
  const handleSubmit = async (status) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/transactions/withdraw/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: status,
        }),
      }
    );
    const data = await res.json();

    router.push("/admin/withdrawals");
  };
  return (
    <div className="flex w-full my-4 gap-2 lg:w-1/2">
      <Button
        className="text-white bg-red-500 flex-grow"
        onClick={() => handleSubmit("confirm")}
      >
        Cancel Transaction
      </Button>
      <Button
        className="text-white bg-green-500 flex-grow"
        onClick={() => handleSubmit("reject")}
      >
        Confirm Transaction
      </Button>
    </div>
  );
}

export default ConfirmWithdrawAdmin;
