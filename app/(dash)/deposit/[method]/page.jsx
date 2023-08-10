import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import DepositForm from "@/components/deposit-form";

async function Page({ params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const method = params.method;

  if (method !== "easypaisa" && method !== "jazzcash") {
    redirect("/deposit");
  }

  return (
    <main className="p-4 flex flex-col gap-5 items-center">
      <h1 className="text-2xl font-bold pl-2">
        Deposit with{" "}
        {method.charAt(0).toUpperCase() + method.substr(1).toLowerCase()}
      </h1>
      <p className="text-muted-foreground text-md">
        Enter the amount you want to deposit
      </p>
      <DepositForm />
    </main>
  );
}

export default Page;
