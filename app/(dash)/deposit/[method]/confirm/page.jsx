import { redirect, useSearchParams } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import DepositForm from "@/components/deposit-form";
import ConfirmDeposit from "@/components/confirm-deposit";

async function Page({ params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const method = params.method;

  if (method !== "easypaisa" && method !== "jazzcash") {
    redirect("/deposit");
  }

  const platform = method === "easypaisa" ? "EasyPaisa" : "JazzCash";

  return (
    <main className="p-4 flex flex-col gap-5 items-center w-full md:w-[500px] justify-center mx-auto">
      <h1 className="text-2xl font-bold pl-2">
        Complete your {platform} deposit
      </h1>
      <p className="text-muted-foreground text-md wrap text-center">
        {method === "easypaisa"
          ? `Send your deposit amount to our account through your EasyPaisa mobile
          account by dialing *786# or through your EasyPaisa mobile app. You can
          deposit money through any nearby EasyPaisa agent too.`
          : `Send your deposit amount to our account through your EasyPaisa mobile
          account by dialing *786# or through your EasyPaisa mobile app. You can
          deposit money through any nearby EasyPaisa agent too.`}
      </p>
      <h1 className="text-xl font-bold pl-2">Account Details</h1>
      <div className="text-md pl-2 text-center flex flex-col gap-2 font-semibold">
        <p>Account Name: Ahmed Abdullah</p>
        <p>Account Number: 03179947486</p>
      </div>
      <p className="text-muted-foreground text-md wrap text-center">
        After sending payment, kindly share the Transaction Screenshot below.
        Our representative will review your payment.
      </p>

      <ConfirmDeposit method={method} username={session.user.username} />
    </main>
  );
}

export default Page;
